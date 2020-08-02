const webpack = require('webpack');

module.exports = {
    // options...
    devServer: {
        proxy: 'http://localhost'
    },
    pwa: {
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true
        }
    }
}
