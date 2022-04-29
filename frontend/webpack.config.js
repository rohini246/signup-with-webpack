const path = require('path');
module.exports = {
    mode:'none',
    entry: ['./src/index.ts'],
    module: {
      rules: [
        { 
          test: /\.ts$/,
          use: 'ts-loader',
         }
      ]
    },
    resolve:{
      extensions:['.ts','.js']
    },
    output: {
      publicPath:'public',
      filename: 'bundle.js',
      path:path.resolve(__dirname,'public'),

    },

  };