"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { MagneticCTA } from "@/components/MagneticCTA";
import { FLEET } from "@/lib/fleet";
import { whatsappLink } from "@/lib/site";
import { springs } from "@/lib/motion";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(6, "Phone or email required"),
  vehicle: z.string().min(1, "Select a vehicle or category"),
  pickupDate: z.string().min(1, "Pickup date required"),
  returnDate: z.string().min(1, "Return date required"),
  service: z.string().min(1, "Select a service"),
  location: z.string().min(2, "Pickup location required"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const SERVICES = [
  "Self-drive / standard hire",
  "Chauffeured",
  "Airport transfer",
  "Corporate & executive",
  "Wedding / event",
  "Security & escort",
  "Long-term hire",
];

export function BookingForm() {
  const reduced = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      // Graceful fallback: route the lead straight to WhatsApp.
      setServerError(
        "Couldn't reach the server. Send your request on WhatsApp instead — it's pre-filled below.",
      );
    }
  };

  const waMessage = () => {
    const v = getValues();
    return whatsappLink(
      `Hello CIA Luxury Fleets, I'd like to book.\n` +
        `Name: ${v.name || "-"}\n` +
        `Vehicle: ${v.vehicle || "-"}\n` +
        `Service: ${v.service || "-"}\n` +
        `Pickup: ${v.pickupDate || "-"} at ${v.location || "-"}\n` +
        `Return: ${v.returnDate || "-"}`,
    );
  };

  return (
    <div className="booking-form-wrap">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            className="booking-success"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springs.reveal}
          >
            <span className="booking-success-icon" aria-hidden>
              <Check size={22} />
            </span>
            <h3 className="booking-success-title font-display">Request received.</h3>
            <p className="booking-success-note">
              We typically reply within ~2 hours. For anything urgent, reach us on
              WhatsApp.
            </p>
            <a
              className="btn-ghost"
              href={waMessage()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue on WhatsApp →
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="booking-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={false}
            exit={reduced ? undefined : { opacity: 0, y: -20 }}
            noValidate
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" autoComplete="name" {...register("name")} />
              {errors.name && <span className="field-error">{errors.name.message}</span>}
            </div>

            <div className="field">
              <label htmlFor="contact">Phone or email</label>
              <input id="contact" autoComplete="tel" {...register("contact")} />
              {errors.contact && (
                <span className="field-error">{errors.contact.message}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="vehicle">Vehicle or category</label>
              <select id="vehicle" defaultValue="" {...register("vehicle")}>
                <option value="" disabled>
                  Select…
                </option>
                <optgroup label="Categories">
                  <option value="Executive">Executive</option>
                  <option value="SUV">SUV</option>
                  <option value="Statement">Statement</option>
                  <option value="Group">Group</option>
                </optgroup>
                <optgroup label="Vehicles">
                  {FLEET.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.vehicle && (
                <span className="field-error">{errors.vehicle.message}</span>
              )}
            </div>

            <div className="field-grid">
              <div className="field">
                <label htmlFor="pickupDate">Pickup date</label>
                <input id="pickupDate" type="date" {...register("pickupDate")} />
                {errors.pickupDate && (
                  <span className="field-error">{errors.pickupDate.message}</span>
                )}
              </div>
              <div className="field">
                <label htmlFor="returnDate">Return date</label>
                <input id="returnDate" type="date" {...register("returnDate")} />
                {errors.returnDate && (
                  <span className="field-error">{errors.returnDate.message}</span>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="service">Service type</label>
              <select id="service" defaultValue="" {...register("service")}>
                <option value="" disabled>
                  Select…
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.service && (
                <span className="field-error">{errors.service.message}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="location">Pickup location</label>
              <input id="location" autoComplete="off" {...register("location")} />
              {errors.location && (
                <span className="field-error">{errors.location.message}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="notes">Notes (optional)</label>
              <textarea id="notes" rows={3} {...register("notes")} />
            </div>

            {serverError && (
              <p className="field-error booking-server-error">
                {serverError}{" "}
                <a href={waMessage()} target="_blank" rel="noopener noreferrer">
                  Open WhatsApp →
                </a>
              </p>
            )}

            <MagneticCTA
              type="submit"
              label={isSubmitting ? "Sending…" : "Reserve your fleet"}
              disabled={isSubmitting}
            />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
