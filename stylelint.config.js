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
    "cascade-layers/require-layers": true,
  },
  plugins: ["./stylelint-plugin-enforce-layer.js"],
};
