/**
 * markdown字符串处理辅助函数集合
 * @author Emmett <heron1991@163.com>
 * @date 2016-07-07 16:46:49
 */

// 换行回车正则
var rEOL = /\r\n/g;
// header正则
var rHeader = /^(-{3,}|;{3,})\n([\s\S]+?)\n\1(?:$|\n([\s\S]*)$)/;
// title正则
var rTitle = /title:(.+)/;
// date正则
var rDate = /date:(.+)/;
// tags正则
var rTags = /tags:(.+)/;
// 摘要正则
var rExcerpt = /<!--+\s*more\s*--+>/i;

// 去掉首尾空格，将\r\n换成\n
function eofFilter(str) {
    return str.trim().replace(rEOL, '\n');
}

// 取文章头部信息，包括title, date, tags, categories
function headerFilter(str) {
    if (typeof str !== 'string') {
        throw new TypeError('str is required!');
    }

    str = eofFilter(str);

    if (rHeader.test(str)) {
        var match = str.match(rHeader);
        var header = (match[2] || '').trim();
        var content = (match[3] || '').trim();
        var data = { raw: str, _content: content };

        if (rTitle.test(header)) {
            data.title = (header.match(rTitle)[1] || '').trim();
        }

        if (rDate.test(header)) {
            data.date = new Date((header.match(rDate)[1] || '').trim());
        }

        if (rTags.test(header)) {
            var tags = (header.match(rTags)[1] || '').trim();
            tags = tags.split(',');
            data.tags = [];

            tags.forEach(function (item) {
                item = item.trim();

                if (item !== '') {
                    data.tags.push(item);
                }
            });
        }

        return data;
    }

    return { raw: str, _content: str };
}

// 取文章摘要
function excerptFilter(data) {
    var content = data.content;

    if (rExcerpt.test(content)) {
        data.content = content.replace(rExcerpt, function(match, index) {
            data.excerpt = content.substring(0, index).trim();

            return '';
        });
    } else {
        data.excerpt = content;
    }
}

module.exports = {
    eofFilter: eofFilter,
    headerFilter: headerFilter,
    excerptFilter: excerptFilter
};