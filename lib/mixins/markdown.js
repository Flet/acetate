var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');

module.exports = function (acetate) {
  var markdown = new MarkdownIt({
    html: true,
    linkify: true,
    langPrefix: '',
    highlight: function (code, lang) {
      return (lang) ? hljs.highlight(lang, code).value : hljs.highlightAuto(code).value;
    }
  });

  return {
    markdown: markdown
  };
};
