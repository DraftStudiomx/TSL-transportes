/** Crédito de la agencia con el ícono de Draft Studio (esquinas + D), tomado de su identidad de marca. */
export default function DraftCredit() {
  return (
    <a className="draft-credit" href="https://draftstudio.mx" target="_blank" rel="noopener" aria-label="Sitio diseñado y desarrollado por Draft Studio">
      <span className="dc-text">Diseño y desarrollo</span>
      <svg className="dc-icon" viewBox="0 0 120 120" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="6" strokeLinecap="square">
          <path d="M14 30V14H30" />
          <path d="M90 14H106V30" />
          <path d="M106 90V106H90" />
          <path d="M30 106H14V90" />
        </g>
        <path d="M38 35H65C77.7 35 88 45.3 88 58V62C88 74.7 77.7 85 65 85H38V35Z" stroke="currentColor" strokeWidth="6.5" />
      </svg>
      <span className="dc-name">Draft Studio</span>
    </a>
  );
}
