/**
 * render.js 将markdown转为html字符串，并添加一些样式类（如代码高亮，行号显示等）
 */

'use strict';

var marked = require('marked');
var assign = require('object-assign');
var stripIndent = require('strip-indent');
var util = require('hexo-util');

var highlight = util.highlight;
var stripHTML = util.stripHTML;
var escapeHTML = util.escapeHTML;
var MarkedRenderer = marked.Renderer;

// 取markdown文件title的正则表达式
var rTitle = /^(-{3,}|;{3,})\n([\s\S]+?)\n\1(?:$|\n([\s\S]*)$)/;
var rEOL = /\r\n/g;

// 拆分字符串，将字符串中的title取出
function splitTitle(str) {
    if (typeof str !== 'string') {
        throw new TypeError('str is required!');
    }

    if (rTitle.test(str)) {
        var match = str.match(rTitle);

        return {
            title: match[2],
            _content: match[3] || '',
            raw: str
        };
    }

    return { _content: str, raw: str };
}

function Renderer() {
    MarkedRenderer.apply(this);

    this._headingId = {};
}

// 继承Render，重写一些渲染的方式
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
    return '<h' + level + ' id="' + id + '"><a href="#' + id + '" class="headerlink" title="' + stripHTML(text) + '"></a>' + text + '</h' + level + '>';
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

function anchorId(str) {
    return util.slugize(str.trim());
}

// 设置代码高亮
marked.setOptions({
    langPrefix: '',
    highlight: function (code, lang) {
        return highlight(stripIndent(code), {
            lang: lang,
            gutter: true,     // 行号
            wrap: true        // 用figure包裹代码
        });
    }
});

module.exports = function (markdownString, options) {
    var data = splitTitle(markdownString.replace(rEOL, '\n'));

    data.content = marked(data._content, assign({
        renderer: new Renderer()
    }, options));

    return data;
};

module.exports.setOptions = marked.setOptions;
