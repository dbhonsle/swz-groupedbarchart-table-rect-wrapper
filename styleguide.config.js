const path = require('path');
const { version } = require('./package.json');
const webpackConf = require('./webpack.config.js');

module.exports = {
    webpackConfig: Array.isArray(webpackConf) ? webpackConf[0] : webpackConf,
    styleguideDir: path.join(__dirname, './docs'),
    sections: [
        {
            name: 'Elements',
            components: () => [
                './src/components/D3ChartwithTableWrapper/D3ChartwithTableWrapper.js'
            ]
        }
    ],
    title: `Swz D3ChartwithTableWrapper`,
    theme: {
        color: {
            link: '#777',
            linkHover: '#0061d5'
        },
        fontFamily: {
            base: 'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif'
        }
    },
    pagePerSection: true
};