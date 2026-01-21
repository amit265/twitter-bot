import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";
import Prompt from "../Prompt.js";
import { GoogleGenAI } from "@google/genai";

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}).readWrite;

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req, res) {
  // Security Check
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const currentHour = new Date().getUTCHours();
    const selectedKey =
      currentHour < 6 ? "CODETWEETPROMPT" : "GENERALTWEETPROMPT";

    console.log(`⏰ Hour: ${currentHour} | Model: gemini-3-flash-preview`);

    // Generation
    const result = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: Prompt[selectedKey] }] }],
    });

    // --- FIX: Access text as a property, not a function ---
    let tweet = result.text;

    if (!tweet) throw new Error("AI returned empty text");
    tweet = tweet.trim();

    // Content Cleaning
    tweet = tweet
      .replace(/```[a-z]*\n?|```/gi, "")
      .replace(/^["']|["']$/g, "")
      .trim();

    if (tweet.length > 280) {
      tweet = tweet.slice(0, 277) + "...";
    }

    const response = await twitterClient.v2.tweet(tweet);

    console.log(`✅ Success: ${tweet}`);
    return res.status(200).json({ success: true, tweet });
  } catch (err) {
    console.error("❌ Execution Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
