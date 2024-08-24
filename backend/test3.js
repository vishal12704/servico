// // var Sentiment = require('sentiment');
// import Sentiment from "sentiment"
// var sentiment = new Sentiment();
// var result = sentiment.analyze('good product, cost effective 👍🏼👍🏼');
// console.dir(result);    // Score: -2, Comparative: -0.666
// import express from "express";
// import bodyParser from "body-parser";
import Sentiment from "sentiment"
// import cors from "cors";

// const app = express();
// const port = 3001;

// app.use(bodyParser.json());
// app.use(cors());

// app.post('/analyze-sentiment', (req, res) => {

//     try {
//         const { text } = req.body;
//         const result = performSentimentAnalysis(text);
//         res.json({ sentiment: result });
//     } catch (error) {
//         console.error('Error analyzing sentiment:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }
// );

// function performSentimentAnalysis(text) {
//     const sentiment = new Sentiment();
//     const result = sentiment.analyze(text);
//     return result;
// }

export var sentiment = new Sentiment();
var answer = sentiment.analyze("this is bad");
console.log(answer);

// if(answer[0] > 0){
//     console.log("Sentiment: Positive");
// }else{
//     console.log("Sentiment: Negative");
// }
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
