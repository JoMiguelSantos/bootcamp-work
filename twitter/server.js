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
            // 2. When we have said token, use it to make another req for tweets
            return getTweets(bearerToken, function (err, tweets) {
                if (err) {
                    throw err;
                }
                return tweets;
            });
        })
        .then((tweets) => {
            // 3. We want to clean up (filter) the tweets.
            const filteredTweets = filterTweets(tweets);
            // 4. we want to send back a response. res.json(filteredTweets)
            return res.json(filteredTweets);
        })
        .catch((err) => console.log("error", err));
});

app.listen(8080, () => console.log("Listening..."));
