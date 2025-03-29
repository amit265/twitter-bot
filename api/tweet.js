import Prompt from './Prompt.js';
import { TwitterApi } from 'twitter-api-v2';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { scheduleJob } from 'node-schedule';
import 'dotenv/config';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log("🚀 Generating tweet...");

      // Generate AI content using Gemini
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt =Prompt.GENERALTWEETPROMPT;

      const result = await model.generateContent(prompt);
      let tweet = result.response.text();

      // Truncate or validate tweet length
      if (tweet.length > 280) {
        tweet = tweet.slice(0, 280);
      }

      await twitterClient.v2.tweet(tweet);
      console.log(`✅ Tweet posted: "${tweet}"`);

      res.status(200).json({ message: 'Tweet posted successfully!' });
    } catch (err) {
      console.error("❌ Error generating or posting tweet:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
  }
}
