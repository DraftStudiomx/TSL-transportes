import { asset, clientLogos } from "@/lib/site";

/** Franja de logos de clientes en movimiento continuo. */
export default function ClientLogos() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="logos section-light" aria-label="Empresas que confían en TSL">
      <div className="container">
        <p className="label">Empresas que confían en TSL</p>
      </div>
      <div className="logos-track">
        <ul className="logos-row">
          {row.map((l, i) => (
            <li key={i} aria-hidden={i >= clientLogos.length}>
              {l.src ? <img src={asset(l.src)} alt={l.name} loading="lazy" /> : <span className="logo-slot">{l.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
