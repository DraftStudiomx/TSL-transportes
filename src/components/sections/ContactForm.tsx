"use client";

import { useRef, useState, type FormEvent } from "react";
import { asset, cargoOptions, unitOptions, waLink } from "@/lib/site";
import { MailIcon, WhatsAppIcon } from "../Icons";

type Status = "idle" | "sending" | "ok" | "error";

const required = ["nombre", "telefono", "correo", "origen", "destino"] as const;

/** Arma el texto de la cotización a partir del formulario (para WhatsApp o como respaldo). */
function summary(data: FormData) {
  const v = (k: string) => String(data.get(k) ?? "").trim();
  return [
    "Hola TSL, quiero cotizar un envío:",
    `• Nombre: ${v("nombre")}${v("empresa") ? ` (${v("empresa")})` : ""}`,
    `• Origen: ${v("origen")}`,
    `• Destino: ${v("destino")}`,
    v("carga") && `• Tipo de carga: ${v("carga")}`,
    v("unidad") && `• Unidad: ${v("unidad")}`,
    v("fecha") && `• Fecha estimada: ${v("fecha")}`,
    v("mensaje") && `• Detalles: ${v("mensaje")}`,
    `• Contacto: ${v("telefono")} · ${v("correo")}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>("idle");
  const [missing, setMissing] = useState<string[]>([]);

  const validate = () => {
    const form = formRef.current!;
    const data = new FormData(form);
    const empty = required.filter((k) => !String(data.get(k) ?? "").trim());
    const email = String(data.get("correo") ?? "");
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) empty.push("correo");
    setMissing(empty);
    if (empty.length) form.querySelector<HTMLElement>(`[name="${empty[0]}"]`)?.focus();
    return empty.length ? null : data;
  };

  const sendWhatsApp = () => {
    const data = validate();
    if (data) window.open(waLink(summary(data)), "_blank", "noopener");
  };

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    const data = validate();
    if (!data) return;
    data.set("t", String(Math.round((Date.now() - startedAt.current) / 1000)));
    setStatus("sending");
    try {
      const res = await fetch(asset("/contacto.php"), { method: "POST", body: data });
      const json = await res.json().catch(() => null);
      setStatus(res.ok && json?.ok ? "ok" : "error");
      if (res.ok && json?.ok) formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (name: string) => `field${missing.includes(name) ? " is-invalid" : ""}`;

  if (status === "ok") {
    return (
      <div className="form-done" role="status">
        <span className="form-done-ico" aria-hidden="true">✓</span>
        <h3>¡Recibimos tu solicitud!</h3>
        <p>Un asesor de TSL te contactará hoy mismo. Si es urgente, escríbenos por WhatsApp.</p>
        <a className="btn btn-accent" href={waLink()} target="_blank" rel="noopener">
          <WhatsAppIcon className="ico" /> Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form ref={formRef} className="quote-form" onSubmit={sendEmail} noValidate>
      <div className="form-grid">
        <label className={fieldClass("nombre")}>
          <span>Nombre *</span>
          <input name="nombre" autoComplete="name" required />
        </label>
        <label className="field">
          <span>Empresa</span>
          <input name="empresa" autoComplete="organization" />
        </label>
        <label className={fieldClass("telefono")}>
          <span>Teléfono *</span>
          <input name="telefono" type="tel" autoComplete="tel" inputMode="tel" required />
        </label>
        <label className={fieldClass("correo")}>
          <span>Correo *</span>
          <input name="correo" type="email" autoComplete="email" required />
        </label>
        <label className={fieldClass("origen")}>
          <span>Origen *</span>
          <input name="origen" placeholder="Ciudad, estado" required />
        </label>
        <label className={fieldClass("destino")}>
          <span>Destino *</span>
          <input name="destino" placeholder="Ciudad, estado o país" required />
        </label>
        <label className="field">
          <span>Tipo de carga</span>
          <select name="carga" defaultValue="">
            <option value="" disabled>
              Selecciona
            </option>
            {cargoOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Tipo de unidad</span>
          <select name="unidad" defaultValue="">
            <option value="" disabled>
              Selecciona
            </option>
            {unitOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Fecha estimada</span>
          <input name="fecha" type="date" />
        </label>
        <label className="field field-wide">
          <span>Detalles de la carga</span>
          <textarea name="mensaje" rows={4} placeholder="Peso, volumen, número de tarimas, si requiere temperatura controlada, etc." />
        </label>
        {/* Trampa para bots: los humanos no la ven */}
        <label className="hp" aria-hidden="true">
          Sitio web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {missing.length > 0 && (
        <p className="form-msg is-error" role="alert">
          Revisa los campos marcados para poder enviar tu cotización.
        </p>
      )}
      {status === "error" && (
        <p className="form-msg is-error" role="alert">
          No pudimos enviar el correo en este momento. Envíalo por WhatsApp y te respondemos de inmediato.
        </p>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-accent btn-lg" onClick={sendWhatsApp}>
          <WhatsAppIcon className="ico" /> Enviar por WhatsApp
        </button>
        <button type="submit" className="btn btn-dark btn-lg" disabled={status === "sending"}>
          <MailIcon className="ico" /> {status === "sending" ? "Enviando…" : "Enviar por correo"}
        </button>
      </div>
      <p className="form-note">Te respondemos el mismo día. Tus datos solo se usan para atender tu cotización.</p>
    </form>
  );
}
