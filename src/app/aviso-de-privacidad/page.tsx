import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { contact, legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Cómo TSL México recaba, usa y protege tus datos personales, y cómo ejercer tus derechos ARCO.",
};

const sections = [
  { id: "responsable", title: "Responsable de tus datos" },
  { id: "datos", title: "Datos que recabamos" },
  { id: "finalidades", title: "Para qué los usamos" },
  { id: "transferencias", title: "Con quién los compartimos" },
  { id: "arco", title: "Derechos ARCO" },
  { id: "revocacion", title: "Revocar tu consentimiento" },
  { id: "limitar", title: "Limitar el uso de tus datos" },
  { id: "cookies", title: "Cookies y tecnologías similares" },
  { id: "cambios", title: "Cambios a este aviso" },
];

export default function AvisoPrivacidadPage() {
  return (
    <>
      <PageHero
        label="Aviso de privacidad"
        lines={["Aviso de", "privacidad."]}
        accentLine={1}
        lead="Cómo recabamos, usamos y protegemos tus datos personales cuando nos pides una cotización o trabajas con nosotros."
      />

      <section className="legal section-light">
        <div className="container legal-grid">
          <nav className="legal-toc" aria-label="Contenido del aviso">
            <p className="label">Contenido</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
            <p className="legal-updated">Última actualización: {legal.updated}</p>
          </nav>

          <article className="legal-body">
            <p className="legal-intro">
              En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su
              normatividad aplicable, ponemos a tu disposición el presente aviso de privacidad.
            </p>

            <h2 id="responsable">1. Responsable de tus datos</h2>
            <p>
              <b>{legal.company}</b>, que opera bajo el nombre comercial {legal.brand}, con domicilio en {legal.address}, es
              responsable del uso y protección de tus datos personales.
            </p>
            <p>
              Para cualquier asunto relacionado con este aviso puedes escribirnos a <b>{legal.privacyEmail}</b> o llamar al{" "}
              {contact.phoneLabel}.
            </p>

            <h2 id="datos">2. Datos que recabamos</h2>
            <p>Recabamos los datos que nos proporcionas directamente por el formulario de este sitio, WhatsApp, correo o teléfono:</p>
            <ul>
              <li>
                <b>Identificación y contacto:</b> nombre, empresa, teléfono y correo electrónico.
              </li>
              <li>
                <b>Datos del servicio:</b> origen y destino, tipo de carga, tipo de unidad, fecha estimada y detalles de la
                mercancía.
              </li>
              <li>
                <b>Datos de facturación</b>, solo si contratas un servicio: razón social, RFC, domicilio fiscal y uso de CFDI.
              </li>
            </ul>
            <p>No solicitamos datos personales sensibles.</p>

            <h2 id="finalidades">3. Para qué los usamos</h2>
            <p>
              <b>Finalidades necesarias</b> para atender tu solicitud y prestar el servicio:
            </p>
            <ul>
              <li>Elaborar y enviarte la cotización que solicitaste.</li>
              <li>Contactarte para aclarar detalles de tu carga y programar el servicio.</li>
              <li>Prestar, dar seguimiento y cerrar el servicio de transporte.</li>
              <li>Emitir facturas y cumplir obligaciones fiscales y legales.</li>
              <li>Atender aclaraciones, quejas o solicitudes relacionadas con el servicio.</li>
            </ul>
            <p>
              <b>Finalidades adicionales</b>, que no son necesarias para el servicio:
            </p>
            <ul>
              <li>Enviarte información sobre nuevos servicios, rutas o promociones.</li>
              <li>Hacer encuestas de satisfacción para mejorar nuestro servicio.</li>
            </ul>
            <p>
              Si no quieres que usemos tus datos para las finalidades adicionales, escríbenos a {legal.privacyEmail}. Negarte
              no afecta la cotización ni el servicio que solicites.
            </p>

            <h2 id="transferencias">4. Con quién los compartimos</h2>
            <p>No vendemos ni rentamos tus datos personales. Solo los compartimos cuando es necesario para prestar el servicio:</p>
            <ul>
              <li>Con aliados comerciales y transportistas que participan en tu servicio, incluidos los cruces fronterizos.</li>
              <li>Con aseguradoras, únicamente si solicitas asegurar tu mercancía.</li>
              <li>Con proveedores de hosting, correo y facturación que nos ayudan a operar, bajo obligación de confidencialidad.</li>
              <li>Con autoridades competentes, cuando la ley lo requiera.</li>
            </ul>
            <p>Estas transferencias no requieren tu consentimiento en términos de la ley, por ser necesarias para cumplir la relación con tu empresa o por mandato legal.</p>

            <h2 id="arco">5. Derechos ARCO</h2>
            <p>Tienes derecho a:</p>
            <ul>
              <li>
                <b>Acceder</b> a los datos que tenemos sobre ti y saber cómo los usamos.
              </li>
              <li>
                <b>Rectificarlos</b> si están incompletos o son incorrectos.
              </li>
              <li>
                <b>Cancelarlos</b> cuando consideres que no se requieren para las finalidades de este aviso.
              </li>
              <li>
                <b>Oponerte</b> a su uso para fines específicos.
              </li>
            </ul>
            <p>Para ejercerlos, envía tu solicitud a {legal.privacyEmail} con:</p>
            <ol>
              <li>Tu nombre y un medio para responderte.</li>
              <li>Una identificación oficial o, en su caso, la de tu representante legal y el documento que lo acredite.</li>
              <li>La descripción clara de los datos y del derecho que quieres ejercer.</li>
              <li>Cualquier documento que ayude a localizar tus datos.</li>
            </ol>
            <p>
              Te responderemos en un máximo de 20 días hábiles. Si la solicitud procede, la haremos efectiva dentro de los 15
              días hábiles siguientes a la respuesta.
            </p>

            <h2 id="revocacion">6. Revocar tu consentimiento</h2>
            <p>
              Puedes revocar en cualquier momento el consentimiento que nos diste para el uso de tus datos, siguiendo el mismo
              procedimiento de los derechos ARCO. En algunos casos no podremos atender la revocación de inmediato, por ejemplo
              cuando debamos conservar datos por obligaciones fiscales o por un servicio en curso.
            </p>

            <h2 id="limitar">7. Limitar el uso de tus datos</h2>
            <p>
              Si quieres dejar de recibir información comercial, escríbenos a {legal.privacyEmail} o responde al mensaje
              pidiendo que te demos de baja.
            </p>

            <h2 id="cookies">8. Cookies y tecnologías similares</h2>
            <p>
              Este sitio no utiliza cookies de rastreo ni de publicidad. Si en el futuro incorporamos herramientas de
              analítica, actualizaremos este aviso e indicaremos cómo desactivarlas.
            </p>
            <p>
              Al usar el botón de WhatsApp, la conversación se rige por las políticas de privacidad de WhatsApp.
            </p>

            <h2 id="cambios">9. Cambios a este aviso</h2>
            <p>
              Este aviso puede cambiar por actualizaciones legales o de nuestros servicios. Publicaremos cualquier cambio en
              esta página, indicando la fecha de la última actualización.
            </p>
            <p>
              Si consideras que tu derecho a la protección de datos personales ha sido vulnerado, puedes acudir ante la
              autoridad competente en la materia.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
