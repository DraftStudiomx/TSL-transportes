import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found section-dark">
      <div className="container">
        <p className="label label-accent">Error 404</p>
        <h1 className="display-1">
          Esta ruta <span className="accent">no existe.</span>
        </h1>
        <p className="nf-lead">La página que buscas se movió o nunca salió de patio.</p>
        <div className="btn-row">
          <Link className="btn btn-accent" href="/">
            Volver al inicio
          </Link>
          <Link className="btn btn-ghost" href="/contacto/">
            Cotizar un envío
          </Link>
        </div>
      </div>
    </section>
  );
}
