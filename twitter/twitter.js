const { key, secret } = require("./secrets.json");
const https = require("https");

module.exports.getToken = (callback) =>
    new Promise((resolve, reject) => {
        const creds = `${key}:${secret}`;
        const encodedCreds = Buffer.from(creds).toString("base64");

        const options = {
            host: "api.twitter.com",
            path: "/oauth2/token",
            method: "POST",
            headers: {
                Authorization: `Basic ${encodedCreds}`,
                "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
            },
        };

        function cb(response) {
            if (response.statusCode != 200) {
                reject(callback(response.statusCode));
                return;
            }

            let body = "";

            response.on("data", (chunk) => {
                body += chunk;
            });

            response.on("end", () => {
                const parsedBody = JSON.parse(body);
                resolve(callback(null, parsedBody.access_token));
            });
        }

        const req = https.request(options, cb);

        req.end("grant_type=client_credentials");
    });

module.exports.getTweets = (bearerToken, screen_name, callback) =>
    new Promise((resolve, reject) => {
        const options = {
            host: "api.twitter.com",
            path: `/1.1/statuses/user_timeline.json?tweet_mode=extended&screen_name=${screen_name}`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        };

        function cb(response) {
            if (response.statusCode != 200) {
                reject(callback(response.statusCode));
                return;
            }

            let body = "";

            response.on("data", (chunk) => {
                body += chunk;
            });

            response.on("end", () => {
                const parsedBody = JSON.parse(body);
                resolve(callback(null, parsedBody));
            });
        }
        const req = https.request(options, cb);

        req.end();
    });

module.exports.filterTweets = function (tweets) {
    let dataArr = [];
    for (let tweet of tweets) {
        if (tweet.entities.urls.length === 1) {
            let dataObj = {
                url: tweet.entities.urls[0].expanded_url,
                text: tweet.full_text.replace(tweet.entities.urls[0].url, ""),
            };
            for (let url in tweet.entities.media) {
                dataObj.text = dataObj.text.replace(url, "");
            }
            dataArr.push(dataObj);
        } else {
            continue;
        }
    }

    return dataArr;
};
