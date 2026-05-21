import stylelint from "stylelint";

const ruleName = "cascade-layers/require-layers";

const ruleMeta = {
  url: "https://github.com/mrtnvh/stylelint-stuff",
};

const ruleMessages = stylelint.utils.ruleMessages(ruleName, {
  cascadeLayers: (type, name) => {
    return `Unexpected unlayered ${type} "${name}"`;
  },
});

const ruleDefaultSecondaryOptions = {
  ignoreAtRules: [
    "@charset",
    "@font-face",
    "@font-feature-values",
    "@font-palette-values",
    "@import",
    "@keyframes",
    "@property",
    "@styleset",
  ],
  ignoreSelectors: [],
};

const {
  createPlugin,
  utils: { report, validateOptions },
} = stylelint;

function traverseParentRules(parent, secondaryOptions) {
  const parentParent = parent?.parent;
  if (!parentParent) {
    return false;
  }
  const { type } = parentParent;

  if (type === "root") {
    return false;
  }

  if (type === "atrule" && testIfNodeToIgnore(parentParent, secondaryOptions)) {
    return true;
  }

  return traverseParentRules(parentParent, secondaryOptions);
}

function testIfNodeToIgnore(node, secondaryOptions) {
  const nodeName = node.name;
  const nodeSelector = node.selector;

  const isLayerAtRule = nodeName === "layer";

  const atRuleToIgnore = secondaryOptions.ignoreAtRules.some((ignoreAtRule) => {
    const sanitizedIgnoreAtRule = ignoreAtRule.replace("@", "");

    return sanitizedIgnoreAtRule === nodeName;
  });

  const selectorToIgnore =
    secondaryOptions.ignoreSelectors.includes(nodeSelector);

  if (isLayerAtRule || atRuleToIgnore || selectorToIgnore) {
    return true;
  }
}

function testIfWrappedInLayer(decl, result, secondaryOptions) {
  const parent = decl.parent;
  if (!parent) {
    return;
  }

  const parentName = parent.name;
  const parentSelector = parent.selector;

  const isWrappedInLayerAtRule = traverseParentRules(decl, secondaryOptions);

  if (!isWrappedInLayerAtRule) {
    const name = (() => {
      switch (parent.type) {
        case "atrule":
        case "root":
          return parentName;
        default:
          return parentSelector;
      }
    })();

    report({
      message: ruleMessages.cascadeLayers(parent.type, name),
      node: parent,
      result,
      ruleName,
    });
  }
}

const ruleFunction = (primary, _secondaryOptions) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    const secondaryOptions = _secondaryOptions || ruleDefaultSecondaryOptions;

    root.walkDecls((decl) =>
      testIfWrappedInLayer(decl, result, secondaryOptions),
    );
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = ruleMessages;
ruleFunction.meta = ruleMeta;

export default createPlugin(ruleName, ruleFunction);
