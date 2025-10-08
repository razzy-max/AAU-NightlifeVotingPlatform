module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  ignorePatterns: [
    "src/generated/**",
    ".next/**",
    "node_modules/**",
    "prisma/migrations/**"
  ],
};
