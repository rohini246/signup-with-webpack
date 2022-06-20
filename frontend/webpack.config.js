const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
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
    // devServer: {
    //   port: 8080
    // }
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/shoppingApp.html',
      }),
    ],
    // plugins: [
    //   new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    // ]
    // devServer: {
    //   contentBase: path.join(__dirname,'public'),
    //   compress:true,
    //   port:8080,
    // }
  

  };