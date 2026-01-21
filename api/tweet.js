import Prompt from "./Prompt.js";
import { TwitterApi } from "twitter-api-v2";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}).readWrite;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // --- Security Check ---
  // Ensure the request has the correct Secret Key from your GitHub Action
const authHeader = req.headers.authorization;

// Vercel Cron automatically sends a 'CRON_SECRET' in the env when triggered
if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  return res.status(401).json({ error: "Unauthorized" });
}

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // --- Rotation Logic ---
    // Your Cron 1: 3:00 AM UTC
    // Your Cron 2: 9:00 AM UTC
    const currentHour = new Date().getUTCHours();
    
    // If hour is before 6 AM UTC, do Code. Otherwise, do General.
    const selectedKey = (currentHour < 6) ? "CODETWEETPROMPT" : "GENERALTWEETPROMPT";

    console.log(`⏰ Triggered at UTC Hour: ${currentHour}`);
    console.log(`🎲 Selected Mode: ${selectedKey}`);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(Prompt[selectedKey]);
    let tweet = result.response.text().trim();

    // --- Content Cleaning ---
    // Removes markdown code blocks (```) and surrounding quotes
    tweet = tweet.replace(/```[a-z]*\n?|```/gi, "").replace(/^["']|["']$/g, "").trim();

    // Final character check for Twitter
    if (tweet.length > 280) {
      tweet = tweet.slice(0, 277) + "...";
    }

    // --- Execution ---
    const response = await twitterClient.v2.tweet(tweet);
    
    console.log(`✅ Tweeted: ${tweet}`);
    return res.status(200).json({ 
      success: true, 
      type: selectedKey,
      tweetId: response.data.id 
    });

  } catch (err) {
    console.error("❌ Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}