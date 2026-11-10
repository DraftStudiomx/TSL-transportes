import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes, singletons } from "./schemas";

const singletonTypes = new Set(singletons.map((s) => s.type));

export default defineConfig({
  name: "tsl-mexico",
  title: "TSL México",
  projectId: "8wo5q7ky",
  dataset: "production",
  plugins: [
    structureTool({
      title: "Contenido",
      // Cada sección abre su documento único directamente
      structure: (S) =>
        S.list()
          .title("Contenido del sitio")
          .items(singletons.map((s) => S.listItem().title(s.title).id(s.type).child(S.document().schemaType(s.type).documentId(s.type)))),
    }),
    // Consultas GROQ: solo para Draft Studio, no estorba al cliente
    visionTool({ title: "Consultas" }),
  ],
  schema: {
    types: schemaTypes,
    // Los documentos únicos no aparecen en "Crear nuevo"
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Sin duplicar ni borrar los documentos únicos
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && ["publish", "discardChanges", "restore"].includes(action))
        : input,
  },
});
