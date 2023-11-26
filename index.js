const url = `https://github.com/topics`;
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage");
const getIssuesPageHtml = require("./getIssues");
// Read Readme first
request(url, cb);

function cb(err, response, html) {
  if (err) {
    console.log(err);
  } else {
    getTopicLinks(html);
  }
}

function getTopicLinks(html) {
  const $ = cheerio.load(html);
  const linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");

  for (let i = 0; i < linkElemArr.length; i++) {
    const href = $(linkElemArr[i]).attr("href");

    let topic = href.split("/").pop();

    const fullLink = `https://github.com${href}`;
    getReposPageHtml(fullLink, topic);
  }
}
