const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../public'),
    devServer:{
        proxy: {
            'lol/summoner/v4/summoners/by-name':{
                target: 'http://localhost:5000'
            }
        }
    }
}