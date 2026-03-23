import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", ".next-build-check/**", "node_modules/**"]
  },
  ...nextVitals
];

export default eslintConfig;
