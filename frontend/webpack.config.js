const path = require('path');
module.exports = {
    mode:'none',
    entry: ['./src/user.ts','./src/shoppingCart.ts'],
    module: {
      rules: [
        { 
          test: /\.ts$/,
          include: [path.resolve(__dirname, "./src")],
          use: 'ts-loader',
         }
      ]
    },
    resolve:{
      extensions:['.ts','.js'],
    },
    output: {
      publicPath:'public',
      filename: ['user','shoppingCart'].js,
      path:path.resolve(__dirname,'public'),

    },

  };