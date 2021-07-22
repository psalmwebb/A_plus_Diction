const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {

    entry:"./src/index.tsx",


    output:{
       path:path.join(__dirname,"public"),
       filename:"bundle.js" 
    },


    resolve:{
        extensions:[".ts",".js",".tsx",".ts"]
    },


    module:{
        rules:[
            {
              test:/\.css$/,
              use:["style-loader","css-loader"]
            },

            {
                test:/\.(js|jsx|tsx)$/,
                use:{
                  loader:"babel-loader"
                },
                exclude:/node_modules/
            },
            // {
            //     test:/\.scss$/,
            //     use:["style-loader","css-loader","sass-loader"],
            //     exclude:/node_modules/
            // }
        ]
    },

    plugins:[
       new HtmlWebpackPlugin(
           {
               template:path.join(__dirname,"public","index.html")
           }
       ),

    ],

    devServer:{
        port:3000,
        hot:true,
        publicPath:"/"
    },

    mode:"development"
}