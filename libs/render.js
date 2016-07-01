/**
 * render.js 将markdown转为符合hexo形式的html字符串
 */

'use strict';

var marked = require('marked');
var assign = require('object-assign');
var stripIndent = require('strip-indent');
var util = require('hexo-util');

var highlight = util.highlight;
var stripHTML = util.stripHTML;
var MarkedRenderer = marked.Renderer;

function Renderer() {
    MarkedRenderer.apply(this);

    this._headingId = {};
}

require('util').inherits(Renderer, MarkedRenderer);

// Add id attribute to headings
Renderer.prototype.heading = function (text, level) {
    var id = anchorId(stripHTML(text));
    var headingId = this._headingId;

    // Add a number after id if repeated
    if (headingId[id]) {
        id += '-' + headingId[id]++;
    } else {
        headingId[id] = 1;
    }

    // add headerlink
    return '<h' + level + ' id="' + id + '"><a href="#' + id + '" class="headerlink" title="' + stripHTML(text) + '"></a>' + text + '</h' + level + '>';
};

function anchorId(str) {
    return util.slugize(str.trim());
}

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

module.exports = {
    marked: function (markdownString, options) {
        return marked(markdownString, assign({
            renderer: new Renderer()
        }, options));
    },
    setOptions: marked.setOptions
};
