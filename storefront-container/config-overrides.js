const { dependencies } = require("./package.json");
const { override } = require("customize-cra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Import css-minimizer-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

const moduleOverride = {
  name: "cap-container",
  filename: `assets/cap_container.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.js`,
  exposes: {},
  remotes: {},
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      import: "react",
      shareScope: "default",
      requiredVersion: dependencies.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
    "react-router-dom": {
      singleton: true,
      requiredVersion: dependencies["react-router-dom"],
    },
  },
};
const configOutputOverRide = {
  chunkFilename: `assets/[name].[contenthash:8].storeFrontContainer.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.chunk.js`,
  filename: `assets/main.storeFrontContainer.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.js`,
  // chunkFormat: "commonjs",
  publicPath: "auto",
  path: path.resolve(__dirname, "build"),
};
const cssPaths = {
  filename: `assets/[name].[contenthash:8].storeFrontContainer.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.css`,
  chunkFilename: `assets/[name].[contenthash:8].storeFrontContainer.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.chunk.css`,
};

function webpackModuleFederation(config) {
  // Add Module Federation Plugin
  config.plugins.push(new ModuleFederationPlugin(moduleOverride)); // Chunk js public path
  config.plugins.forEach((p, i) => {
    if (p instanceof MiniCssExtractPlugin) {
      config.plugins.splice(i, 1, new MiniCssExtractPlugin(cssPaths));
    }
  });
  config.output = configOutputOverRide;

  // Loader to remove jsx loader error and also not add css loader
  config.module.rules.push(
    {
      test: /\.(js|jsx)$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-syntax-jsx",
            "@babel/plugin-syntax-dynamic-import",
          ],
        },
      },
    },
    {
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    }
  );

  // Optimizations
  config.optimization = {
    splitChunks: {
      chunks: "all", // Split both initial and additional chunks
      maxAsyncRequests: 1000,
      cacheGroups: {
        sharedComponentDuo: {
          test: /[\\/]node_modules[\\/](?=@getflits\/storefront-shared-component-duo)[\\/]/,
          name: "shared-component-duo",
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true,
          minChunks: 5,
          enforce: true,
        },
        sharedComponentUno: {
          test: /[\\/]node_modules[\\/](?=@getflits\/storefront-shared-component-uno)[\\/]/,
          name: "shared-component-uno",
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true,
          minChunks: 5,
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // Drop console statements
            arrows: true,
            computed_props: true,
            dead_code: true,
            passes: 3,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    concatenateModules: true, // Concatenate modules to reduce function call overhead
    usedExports: true, // Tree-shake unused exports
    sideEffects: true, // Mark modules with side-effects for tree-shaking
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
  };

  return config;
}

module.exports = override(webpackModuleFederation);
