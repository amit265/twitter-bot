# 🐦 Coderespite Twitter Bot

An automated Twitter bot for **Coderespite** that alternates between sharing high-value code snippets and founder-led "Build in Public" insights. Powered by **Gemini 1.5 Pro**, **Vercel**, and **GitHub Actions**.

## 🚀 How it Works
The bot is triggered twice daily via GitHub Actions:
1.  **03:00 UTC (08:30 IST):** Posts a **Code Snippet** (React, TypeScript, Node, etc.)
2.  **09:00 UTC (14:30 IST):** Posts a **Founder Insight** (Mindset, Hot Takes, Engagement)

The rotation logic is handled in `api/tweet.js` based on the UTC hour of the request.

---

## 🛠 Project Structure
- **/api/tweet.js**: The main logic. Handles security, time-checks, AI generation, and posting.
- **Prompt.js**: Contains the AI instructions. This is where you change the "voice" of the bot.
- **.github/workflows/**: Contains the cron job schedule.

---

## 🔑 Environment Variables
You must set these in your **Vercel Dashboard**:

| Variable | Description |
| :--- | :--- |
| `TWITTER_API_KEY` | Twitter Dev App Key |
| `TWITTER_API_SECRET` | Twitter Dev App Secret |
| `TWITTER_ACCESS_TOKEN` | Your Account Access Token |
| `TWITTER_ACCESS_TOKEN_SECRET` | Your Account Token Secret |
| `GEMINI_API_KEY` | Google AI API Key |
| `CRON_SECRET` | A random string to secure your API endpoint |

---

## 🛡 Security
To prevent unauthorized users from triggering your bot, the `/api/tweet` endpoint requires a **Bearer Token**. 
- The token is stored in Vercel as `CRON_SECRET`.
- The token is stored in GitHub as `CRON_SECRET`.
- GitHub sends this token in the header of every request.

---

## 📝 Updating Content
To change what the bot talks about, edit `Prompt.js`.
- If the bot is tweeting too much text, add: `"Strictly stay under 250 characters."`
- If you want to add new topics (like Vue or SQL), add them to the `TOPICS` list in the `CODETWEETPROMPT`.

---

## 🧪 Manual Testing
1. Go to your GitHub Repository.
2. Click the **Actions** tab.
3. Select **Schedule Tweet** on the left.
4. Click **Run workflow** > **Run workflow**.
5. Check your Vercel logs to see the output.