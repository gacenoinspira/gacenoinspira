import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {
    extends: [
      "next/core-web-vitals", 
      "next/typescript"
    ],
  },
});

const eslintConfig = [
  // 1. Cargar las configuraciones recomendadas de Next.js y TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Definir reglas personalizadas para tu proyecto
  {
    files: ["**/*.ts", "**/*.tsx"], // Aplica estas reglas solo a archivos TypeScript
    rules: {
      // Reglas para Next.js
      "@next/next/no-img-element": "warn", // Cambia 'error' a 'warn' para permitir `<img>` pero te avisa
      "@next/next/no-html-link-for-pages": "off", // Deshabilita esta regla si usas `<a>` para navegar entre páginas
      
      // Reglas para TypeScript
      "@typescript-eslint/no-explicit-any": "warn", // Advierte sobre el uso de `any`, pero no detiene el build
      
      // La regla clave para resolver tus errores:
      // Ignora la validación de `no-unused-vars` para los errores en los bloques `catch`.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "args": "after-used",
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "caughtErrors": "none" // <-- Esta es la modificación clave
        }
      ],

      // Reglas generales de ESLint
      "no-console": ["warn", { "allow": ["warn", "error"] }], // Advierte sobre `console.log`, pero permite `warn` y `error`
      "react/react-in-jsx-scope": "off" // Desactiva esta regla para Next.js 12+ ya que no es necesario
    },
  },
];

export default eslintConfig;