import { asset, type Photo } from "@/lib/site";

/**
 * Foto real o, mientras llega, un espacio reservado con la descripción de la toma.
 * Así el diseño queda listo y solo se cambia el archivo.
 */
export default function PhotoSlot({ photo, className = "", ratio }: { photo: Photo; className?: string; ratio?: string }) {
  const style = ratio ? { aspectRatio: ratio } : undefined;
  if (photo.src) {
    return (
      <div className={`photo-slot has-photo ${className}`} style={style}>
        <img src={asset(photo.src)} alt={photo.label} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`photo-slot ${className}`} style={style} role="img" aria-label={`Foto pendiente: ${photo.label}`}>
      <svg className="ps-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span className="ps-label">{photo.label}</span>
      {photo.hint && <span className="ps-hint">{photo.hint}</span>}
      <span className="ps-tag">Foto pendiente</span>
    </div>
  );
}
