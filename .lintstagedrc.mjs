const config = {
  "**/*.{js,cjs,mjs,ts,tsx}": "npx prettier --write",
  "apps/frontend/**/*.{ts,tsx}": [
    "yarn workspace frontend eslint --cache --fix",
    () => "yarn workspace frontend tsc --noEmit",
  ],
};

export default config;
