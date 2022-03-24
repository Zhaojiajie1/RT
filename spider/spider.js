const cheerio = require('cheerio');
const request = require('request');
const https = require('https');
const fs = require('fs');


let url = "https://www.chinanews.com.cn/photo/more/1.html"

async function getData(url) {
    await https.request(url, (res) => {
        let chunks = [];
        res.on('data', (content) => chunks.push(content));

        res.on('end', () => {
            console.log(Buffer.concat(chunks).toString('utf-8'));
            let $ = cheerio.load(htmlStr)
        })
    })

}
