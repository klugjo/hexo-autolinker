if (hexo.config.autolinker && hexo.config.autolinker.enable) {
    hexo.extend.filter.register('after_render:html', require('./lib/filter'));
}