const rp = require('request-promise');
const cheerio = require('cheerio')

class htmlFetcher {
    constructor(S, URL) {
        this.selector = S;
        this.url = URL
    }

    fetchData() {
        return  rp(this.url)
                .then(html => cheerio.load(html))
                .then($ => $(this.selector).text().trim())
    }

    fetchLink() {
        return  rp(this.url)
                .then(html => cheerio.load(html))
                .then($ => this.getDownloadLink($(this.selector).children().eq(0).text(), $(this.selector).children().eq(1).children().eq(0).attr('href')))
    }

    getDownloadLink(date, link) {
        const linkSplitted = link.split('/')
        const id = linkSplitted[linkSplitted.length - 2]
        
        return {
            srcUrl: link,
            downloadURL: `https://drive.google.com/u/0/uc?id=${id}&export=download/`,
            date
        }
    }
}

obj = new htmlFetcher("body > div.row > div.col.l6.m6.s12 > div > table > tbody > tr:nth-child(1)", "https://iasbano.com/upsc_thehindu_free_download.php#download_the_hindu")
obj.fetchLink()//.then(a => console.log(a))

module.exports = htmlFetcher