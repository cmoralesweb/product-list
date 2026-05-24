export default {
  extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["layer", "screen"],
      },
    ],
    "declaration-no-important": true,
    "max-nesting-depth": 3,
    "no-descending-specificity": null,
    "selector-class-pattern": [
      "^[a-z]([a-z0-9-]*)(__[a-z0-9-]+)?(--[a-z0-9-]+)?$",
      {
        message: "Expected class selector to be kebab-case (with BEM modifiers)",
      },
    ],
    "cascade-layers/require-layers": true,
  },
  plugins: ["./stylelint-plugin-enforce-layer.js"],
};
