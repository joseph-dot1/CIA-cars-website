import { MapPin, Phone, Instagram } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { MagneticCTA } from "@/components/MagneticCTA";
import { SITE, WHATSAPP_DEFAULT } from "@/lib/site";

// Split-panel — editorial contact block (left) + functional form (right) (§4 Gear 07).
export function Gear07Booking() {
  return (
    <section id="gear-07" className="gear booking-gear" aria-label="Booking and contact">
      <div className="shell booking-grid">
        <div className="booking-editorial">
          <span className="mono-label">Gear 07 / Reserve</span>
          <h2 className="booking-title font-display">Reserve your fleet.</h2>
          <p className="booking-lead">
            Tell us the vehicle and the dates. We&apos;ll handle the rest — delivered to
            your door across Port Harcourt.
          </p>

          <ul className="booking-contact">
            <li>
              <MapPin size={16} aria-hidden />
              <span>
                {SITE.address.street}, {SITE.address.city} {SITE.address.postal},{" "}
                {SITE.address.region}
              </span>
            </li>
            <li>
              <Phone size={16} aria-hidden />
              <a href={SITE.phoneHref}>{SITE.phone}</a>
            </li>
            <li>
              <Instagram size={16} aria-hidden />
              <a href={SITE.instagramHref} target="_blank" rel="noopener noreferrer">
                {SITE.instagram}
              </a>
            </li>
          </ul>

          <div className="booking-wa">
            <MagneticCTA label="Book on WhatsApp →" href={WHATSAPP_DEFAULT} />
          </div>

          <p className="booking-fine mono-label">
            25+ · valid licence · refundable deposit · open daily
          </p>
        </div>

        <div className="booking-panel">
          <BookingForm />
        </div>
      </div>

      <footer className="site-footer shell">
        <span className="mono-label">© {new Date().getFullYear()} {SITE.name}</span>
        <span className="mono-label">{SITE.tagline}</span>
      </footer>
    </section>
  );
}
