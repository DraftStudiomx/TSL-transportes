# CMS (Sanity) — TSL México

Proyecto: **8wo5q7ky** · dataset **production** · organización **TSL México**.

## Cómo funciona

1. El cliente edita en el panel (**https://tsl-mexico.sanity.studio**) y da **Publicar**.
2. Sanity avisa a GitHub con un webhook (`sanity-publish`).
3. GitHub reconstruye el sitio y lo publica (GitHub Pages hoy; cPanel cuando se active).
4. Si Sanity no responde o un campo está vacío, el sitio usa el contenido de `src/lib/site.ts`.

El contenido se agrupa en 5 secciones del panel: **Ajustes generales**, **Textos de páginas**,
**Flotilla y cobertura**, **Gente y clientes** y **Preguntas frecuentes**.
Diseño, animaciones y el mapa se quedan en código.

## Configuración (una sola vez)

### 1. Cargar el contenido actual a Sanity
1. sanity.io/manage → proyecto TSL México → **API → Tokens → Add API token**, permiso **Editor**.
2. Crea el archivo `.env.local` en la raíz del repo (no se sube a GitHub):
   ```
   SANITY_WRITE_TOKEN=pega_aqui_el_token
   ```
3. `npm run seed` (crea lo que no exista; `npm run seed -- --force` reemplaza todo).

### 2. Publicar el panel
1. `npm --prefix studio install` (solo la primera vez).
2. `npm run studio:deploy` → pide iniciar sesión en Sanity → queda en https://tsl-mexico.sanity.studio.
   - Para usarlo en local: `npm run studio` (http://localhost:3333). Si marca error de CORS, agrega
     `http://localhost:3333` en **API → CORS origins** con *Allow credentials*.

### 3. Dar acceso al cliente
sanity.io/manage → organización TSL México → **Members → Invite** → correo de Fernando, rol **Administrator**.

### 4. Publicación automática (webhook)
1. GitHub → tu perfil → **Settings → Developer settings → Fine-grained tokens** → nuevo token
   solo para el repo `DraftStudiomx/TSL-transportes` con permiso **Contents: Read and write**.
2. sanity.io/manage → proyecto → **API → Webhooks → Create webhook**:
   - URL: `https://api.github.com/repos/DraftStudiomx/TSL-transportes/dispatches`
   - Dataset: `production` · Trigger on: Create, Update, Delete
   - Filter: `_type in ["ajustes", "textos", "flotilla", "gente", "preguntas"]`
   - Projection: `{"event_type": "sanity-publish"}`
   - HTTP method: POST
   - HTTP Headers: `Authorization` = `Bearer <token de GitHub>` y `Accept` = `application/vnd.github+json`
3. Publica cualquier cambio en el panel y revisa en GitHub → **Actions** que corra el deploy.

### 5. Deploy al cPanel (cuando se suba a tslmexico.com)
GitHub → repo → **Settings → Secrets and variables → Actions**:
- Secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (cuenta FTP del cPanel).
- Variables: `CPANEL_ENABLED` = `true`.

Antes del primer deploy, respalda el `public_html` actual desde el cPanel.

## Fotos pendientes
En **Gente y clientes** cada foto tiene “Descripción” e “Indicación para la toma”. Mientras no haya imagen,
el sitio muestra un espacio “Foto pendiente” con esa descripción. Al subir la imagen y publicar, se reemplaza solo.
