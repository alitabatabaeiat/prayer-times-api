const DisableTryItOutPlugin = function () {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false,
        },
      },
    },
  };
};

module.exports = {
  swaggerOptions: {
    plugins: [DisableTryItOutPlugin],
  },
};
