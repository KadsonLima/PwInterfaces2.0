const PROXY_CONFIG = [
    {
        secure:false,
        changeOrigin:true,
        pathRewrite:{
            "^/":""
        }
    }
]

module.exports = PROXY_CONFIG;