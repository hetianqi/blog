/**
 * markdown字符串处理辅助函数集合
 */

// 取markdown文件title的正则表达式
var rTitle = /^(-{3,}|;{3,})\n([\s\S]+?)\n\1(?:$|\n([\s\S]*)$)/;
// 换行回车正则
var rEOL = /\r\n/g;
// 摘要正则
var rExcerpt = /<!--+\s*more\s*--+>/i;

// 拆分字符串，将字符串中的title取出
function splitTitle(str) {
    // 去掉收尾空格，将\r\n换成\n
    str = str.trim().replace(rEOL, '\n');

    if (typeof str !== 'string') {
        throw new TypeError('str is required!');
    }

    if (rTitle.test(str)) {
        var match = str.match(rTitle);

        return {
            title: match[2].trim(),
            _content: (match[3] || '').trim(),
            raw: str
        };
    }

    return { _content: str, raw: str };
}

// 取文章摘要
function excerptFilter(data) {
    var content = data.content;

    if (rExcerpt.test(content)) {
        data.content = content.replace(rExcerpt, function(match, index) {
            data.excerpt = content.substring(0, index).trim();
            // data.more = content.substring(index + match.length).trim();

            return '';
        });
    } else {
        data.excerpt = content;
        // data.more = content;
    }
}

module.exports = {
    splitTitle: splitTitle,
    excerptFilter: excerptFilter
};