var path = require('path');
var webpack = require('webpack');
     
 module.exports = {
     entry: './wayman/wayman/static/react/app.jsx',
     output: {
         path: path.resolve(__dirname, 'wayman/wayman/static/react/'),
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.jsx$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             },
             {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };
