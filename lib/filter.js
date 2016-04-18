var Autolinker = require('autolinker');
var _ = require('lodash');

var _defaultConfig = {
    newWindow: true,
    stripPrefix: false,
    phone: false,
    twitter: false,
    hashtag: false
};

module.exports = function(source) {

    var config = this.config;

    config = _.extend({}, _defaultConfig, config);

    return Autolinker.link(source, config);
};