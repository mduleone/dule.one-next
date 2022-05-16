const common = require('./common');

const config = {
  ...common,
  processors: ['stylelint-processor-styled-components'],
  extends: [...common.extends, 'stylelint-config-styled-components'],
};

module.exports = config;
