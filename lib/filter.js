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

    this.config = this.config || {};

    var config = this.config.autolinker || {};

    config = _.extend({}, _defaultConfig, config);

    return Autolinker.link(source, config);
};