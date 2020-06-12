const express = require("express");
const app = express();

const { getToken, getTweets, filterTweets } = require("./twitter");

app.use(express.static("ticker"));

app.get("/data.json", (req, res) => {
    // 1. We want to get the bearerToken from twitter...
    getToken((err, bearerToken) => {
        if (err) {
            throw err;
        }
        return bearerToken;
    })
        .then((bearerToken) => {
            function cb(err, tweets) {
                if (err) {
                    throw err;
                }
                return tweets;
            }
            // 2. When we have said token, use it to make another req for tweets
            return Promise.all([
                getTweets(bearerToken, "nytimes", cb),
                getTweets(bearerToken, "forbes", cb),
                getTweets(bearerToken, "bbcworld", cb),
            ]);
        })
        .then((tweets) => {
            let allTweets = [];
            for (let singleSource of tweets) {
                allTweets.push(...singleSource);
            }

            allTweets = allTweets.sort((a, b) => {
                return new Date(b.created_at) - new Date(a.created_at);
            });

            // 3. We want to clean up (filter) the tweets.
            const filteredTweets = filterTweets(allTweets);
            // 4. we want to send back a response. res.json(filteredTweets)
            return res.json(filteredTweets);
        })
        .catch((err) => console.log("error", err));
});

app.listen(8080, () => console.log("Listening..."));
