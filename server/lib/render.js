/**
 * 将markdown转为html字符串，并添加一些样式类（如代码高亮，行号显示等）
 * @author hetianqi <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

'use strict';

var marked = require('marked');
var assign = require('object-assign');
var stripIndent = require('strip-indent');
var util = require('hexo-util');
var renderUtil = require('./renderUtil');

var highlight = util.highlight;
var stripHTML = util.stripHTML;
var escapeHTML = util.escapeHTML;
var MarkedRenderer = marked.Renderer;

// marked渲染类
function Renderer() {
    MarkedRenderer.apply(this);

    this._headingId = {};
}

// 继承原Renderer类，重写一些渲染的方式
require('util').inherits(Renderer, MarkedRenderer);

// 添加标题锚点
Renderer.prototype.heading = function (text, level) {
    var id = anchorId(stripHTML(text));
    var headingId = this._headingId;

    // 如果标题重复则用序号区分
    if (headingId[id]) {
        id += '-' + headingId[id]++;
    } else {
        headingId[id] = 1;
    }

    // 返回标题锚点
    return '<h' + level + ' id="post-title-' + id + '">' + text + '</h' + level + '>';
};

// 代码高亮、行号处理
Renderer.prototype.code = function (code, lang, escaped) {
    if (this.options.highlight) {
        return this.options.highlight(code, lang);
    } else {
        return '<pre><code class="'
            + this.options.langPrefix
            + escapeHTML(lang)
            + '">'
            + escapeHTML(code)
            + '\n</code></pre>\n';
    }  
};

// 图片处理
Renderer.prototype.image = function (href, title, text) {
    var img = '<img src="' + href + '"';

    if (title) {
        img += ' title="' + title + '"';
    }
    if (text) {
        img += ' alt="' + text + '"';
    }

    img += '>';

    return '<span class="full-img">' + img + '</span>';
};

// 取锚点
function anchorId(str) {
    return util.slugize(str.trim());
}

// 设置代码高亮
marked.setOptions({
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    langPrefix: '',
    highlight: function (code, lang) {
        return highlight(stripIndent(code), {
            lang: lang,
            gutter: true,     // 行号
            wrap: true        // 用figure包裹代码
        });
    }
});

module.exports = function render(markdownString, options) {
    var data = renderUtil.headerFilter(markdownString);

    data.content = marked(data._content, assign({
        renderer: new Renderer()
    }, options)).trim();
    renderUtil.excerptFilter(data);

    return data;
};

module.exports.setOptions = marked.setOptions;
