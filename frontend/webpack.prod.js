const path = require('path');
const common = require("./webpack.config");
const {merge} = require('webpack-merge');
module.exports = merge(common,{
    mode:'production',   
    output: {
      publicPath:'public',
      filename: ['user','shoppingCart'].contentHash.js,
      path:path.resolve(__dirname,'public'),
    },
    
  });