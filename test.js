import handler from './api/tweet.js';

// Fake objects to mimic Vercel
const req = {
  method: 'POST',
  headers: {
    authorization: `Bearer ${process.env.CRON_SECRET}`
  }
};

const res = {
  status: (code) => ({
    json: (data) => console.log(`Status ${code}:`, data),
    send: (data) => console.log(`Status ${code}:`, data)
  })
};

console.log("Testing Bot Logic...");
handler(req, res);