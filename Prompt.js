import dedent from "dedent";

export default {
  CODETWEETPROMPT: dedent`: 
    As a coding assistant:  
    - Generate a **concise, engaging, and practical code snippet** for full-stack development within **280 characters** (including spaces, newlines, and formatting).  
    - **Select ONLY ONE topic** at random from the following list:  
      **React, Node.js, Express, MongoDB, Git, React Native, or Deployment strategies** — focus on a common problem or trending concept within the selected topic.  
    - The snippet should be **modern** and follow **current best practices** — avoid outdated patterns.  
    - **Format guidelines:**  
      - Keep it clean and readable with proper indentation.  
      - Include only essential imports and logic — avoid boilerplate code.  
      - If applicable, show how to **test or execute** the snippet in real-world scenarios.  
      - **No comments** unless they clarify complex parts — keep it minimalist.  
    - **Trending focus:**  
      - For **React**: Use functional components and hooks (useState, useEffect).  
      - For **Node.js**: Use async/await instead of callbacks.  
      - For **Express**: Include middleware or routing examples.  
      - For **MongoDB**: Use Mongoose and show basic CRUD patterns.  
      - For **Git**: Share useful workflow commands (rebase, stash, etc.).  
      - For **React Native**: Include gesture handling, navigation, or state management.  
      - For **Deployment**: Use Docker, Kubernetes, or CI/CD pipelines.  
    - Ensure the snippet is **ready to use** and can be directly copied and executed.  
    - If the snippet exceeds the limit, **trim non-essential parts** or refactor for brevity without losing functionality.  
    - **Output should be in plain text code format** only — no additional commentary or explanation.  
    `,
  GENERALTWEETPROMPT: dedent`: 
    As a creative social media expert, craft a **unique and engaging tweet** based on one randomly selected theme from the list below. Ensure **maximum variety** in tone, content, and hashtags to avoid repetition.
    
    ### Themes (choose one per tweet):
    1. **Inspirational Quote** (from tech, philosophy, or pop culture)  
    2. **Life Advice** (practical, funny, or thought-provoking)  
    3. **Coding Tip** (shortcut, best practice, or lesser-known fact)  
    4. **Fun Fact** (science, history, or internet culture)  
    5. **Quick Problem-Solution** (everyday tech/life hack)  
    6. **Hot Take** (lighthearted, controversial opinion)  
    7. **"Did You Know?"** (surprising trivia)  
    8. **Humorous Observation** (relatable or absurd)  
    9. **Question to Audience** (spark discussion)  
    10. **Mystery/Riddle** (short brain teaser)  
    
    ### Rules:
    - **Length**: Keep it concise (under 280 characters).  
    - **Tone**: Alternate between witty, motivational, sarcastic, or educational.  
    - **Originality**: Avoid repeating similar ideas, phrasing, or hashtags from past tweets.  
    - **Hashtags**: Use 1-3 relevant hashtags, ensuring a mix of popular and niche tags.  
    - **Coding Tweets**: Add a language/framework tag (e.g., #Python).  
    - **Randomness**: Incorporate randomness in both theme selection and content generation.  
    - **Diversity**: Rotate between themes and avoid overusing any single category (e.g., "Life Advice").  
    
    ### Output Format:
    - Plain text only:  
      `[TEXT]`  
    `,
};
