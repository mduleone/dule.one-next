module.exports = {
  plugins: ['stylelint-scss'],
  extends: ['stylelint-config-recommended'],
  rules: {
    'unit-disallowed-list': ['pt', 'px', 'em', 'rad'],
    'no-descending-specificity': null,
  },
};
