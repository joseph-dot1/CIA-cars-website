import { NextResponse } from "next/server";
import { z } from "zod";

// Booking endpoint. Works WITHOUT a Resend key — it validates and acknowledges
// the lead so the client UI can confirm; if RESEND_API_KEY is present it also
// emails the booking. The form always has a WhatsApp fallback regardless.

const schema = z.object({
  name: z.string().min(2),
  contact: z.string().min(6),
  vehicle: z.string().min(1),
  pickupDate: z.string().min(1),
  returnDate: z.string().min(1),
  service: z.string().min(1),
  location: z.string().min(2),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  // No key configured: acknowledge so the lead isn't lost (WhatsApp is primary).
  if (!apiKey) {
    console.info("[booking] received (no email backend configured):", {
      name: data.name,
      vehicle: data.vehicle,
      service: data.service,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const to = process.env.BOOKING_TO_EMAIL || "bookings@cialuxuryfleets.com";
    const from = process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev";

    const html = `
      <h2>New booking request — CIA Luxury Fleets</h2>
      <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
        <tr><td><b>Name</b></td><td>${escape(data.name)}</td></tr>
        <tr><td><b>Contact</b></td><td>${escape(data.contact)}</td></tr>
        <tr><td><b>Vehicle / category</b></td><td>${escape(data.vehicle)}</td></tr>
        <tr><td><b>Service</b></td><td>${escape(data.service)}</td></tr>
        <tr><td><b>Pickup</b></td><td>${escape(data.pickupDate)} — ${escape(data.location)}</td></tr>
        <tr><td><b>Return</b></td><td>${escape(data.returnDate)}</td></tr>
        <tr><td><b>Notes</b></td><td>${escape(data.notes || "—")}</td></tr>
      </table>
    `;

    await resend.emails.send({
      from: `CIA Luxury Fleets <${from}>`,
      to,
      subject: `Booking — ${data.name} — ${data.vehicle}`,
      replyTo: data.contact.includes("@") ? data.contact : undefined,
      html,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[booking] email send failed:", err);
    // Still report ok=false so the client surfaces the WhatsApp fallback.
    return NextResponse.json(
      { ok: false, error: "Email delivery failed" },
      { status: 502 },
    );
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
