import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { getContent } from "@/lib/content";
import ContactForm from "@/components/sections/ContactForm";
import Faq from "@/components/Faq";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { linksFor } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Cotiza tu envío con TSL México por WhatsApp, correo o teléfono. Te respondemos el mismo día.",
};

export default async function ContactoPage() {
  const { texts, bases, contact } = await getContent();
  const { waLink, mailLink } = linksFor(contact);
  const hero = texts.heroContacto;

  return (
    <>
      <PageHero
        label="Contacto"
        lines={hero.lines}
        accentLine={hero.accentLine}
        lead={hero.lead}
      />

      <section className="contact section-light">
        <div className="container contact-grid">
          <div className="contact-form-wrap">
            <p className="label">Solicitud de cotización</p>
            <ContactForm />
          </div>

          <aside className="contact-aside">
            <p className="label">Contacto directo</p>
            <ul className="channels">
              <li>
                <a href={waLink()} target="_blank" rel="noopener" className="channel channel-wa">
                  <WhatsAppIcon className="ico" />
                  <span>
                    <small>WhatsApp</small>
                    <b>{contact.whatsappLabel}</b>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:+52${contact.phone}`} className="channel">
                  <PhoneIcon className="ico" />
                  <span>
                    <small>Teléfono</small>
                    <b>{contact.phoneLabel}</b>
                  </span>
                </a>
              </li>
              <li>
                <a href={mailLink} className="channel">
                  <MailIcon className="ico" />
                  <span>
                    <small>Correo</small>
                    <b>{contact.email}</b>
                  </span>
                </a>
              </li>
            </ul>

            <p className="label">Ubicaciones</p>
            <ul className="contact-places">
              {bases.map((b) => (
                <li key={b.city}>
                  <b>{b.city}</b>
                  <span>
                    {b.kind} · {b.note}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <Faq />
    </>
  );
}
