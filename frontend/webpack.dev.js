const path = require('path');
const common = require("./webpack.config");
const {merge} = require('webpack-merge');
module.exports = merge(common,{
    mode:'development',   
    output: {
      publicPath:'public',
      filename: ['user','shoppingCart'].js,
      path:path.resolve(__dirname,'public'),
    },
    
  });