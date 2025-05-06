const { dependencies } = require("./package.json");
const { override } = require("customize-cra");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Import css-minimizer-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

const moduleOverride = {
  name: 'storeFrontCredit',
  filename: `assets/store_front_credit.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.js`,
  exposes: {
    "./storeFrontCredit": "./src/App.js",
    "./storeFrontCreditUsage": "./src/CreditUsage.js",
    "./storeFrontRefundCredit": "./src/RefundCredit.jsx"
  },
  remotes: {
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      import: 'react',
      shareScope: 'default',
      requiredVersion: dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
    'react-router-dom': {
      singleton: true,
      requiredVersion: dependencies['react-router-dom'],
    },
  },
};
const configOutputOverRide = {
  chunkFilename: `assets/[name].[contenthash:8].storeFrontCredit.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.chunk.js`,
  filename: `assets/[name].[contenthash:8].storeFrontCredit.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.js`,
  // chunkFormat: "commonjs",
  publicPath: "auto",
  path: path.resolve(__dirname, "build")
};
const cssPaths = {
  filename: `assets/[name].[contenthash:8].storeFrontCredit.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.css`,
  chunkFilename: `assets/[name].[contenthash:8].storeFrontCredit.${process.env.REACT_APP_CODE_BUILD_VERSION ?? ""}.chunk.css`,
}

function webpackModuleFederation(config) {
  // Add Module Federation Plugin
  config.plugins.push(new ModuleFederationPlugin(moduleOverride)); // Chunk js public path
  config.plugins.forEach((p, i) => {
    if( p instanceof MiniCssExtractPlugin) {
      config.plugins.splice(i,1, new MiniCssExtractPlugin( cssPaths ));
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
      minSize: 20000, // Minimum chunk size (adjust based on needs)
      maxSize: 250000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // Extract vendor libraries
          priority: -10, // Load vendors last for better caching
          name: "vendors",
          chunks: "all",
          reuseExistingChunk: true,
          minChunks: 5,
          enforce: true, // Enforce this group creation
        },
        common: {
          // Split common chunks used across multiple entries
          name: "common",
          minChunks: 5, // Minimum occurrences required to be split
          chunks: "all",
          reuseExistingChunk: true,
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
      new CssMinimizerPlugin()
    ],
    concatenateModules: true, // Concatenate modules to reduce function call overhead
    usedExports: true, // Tree-shake unused exports
    sideEffects: true, // Mark modules with side-effects for tree-shaking
  };

  return config;
}

module.exports = override(webpackModuleFederation);
