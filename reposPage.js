const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./getIssues");

function getReposPageHtml(url, topic) {
  request(url, cb);

  function cb(err, response, html) {
    if (err) {
      console.log(err);
    } else {
      getReposLink(html, topic);
    }
  }

  function getReposLink(html, topic) {
    const $ = cheerio.load(html);
    const headingsArray = $(".f3.color-fg-muted.text-normal.lh-condensed");
    console.log("topic", topic);
    for (let i = 0; i < 8; i++) {
      let twoAnchors = $(headingsArray[i]).find("a");
      const fullLink = $(twoAnchors[1]).attr("href");
      console.log("link", `https://github.com${fullLink}/issues`);
      getIssuesPageHtml(fullLink, topic);
    }
    console.log("````````````````````````````````````````````````");
  }
}

module.exports = getReposPageHtml;
