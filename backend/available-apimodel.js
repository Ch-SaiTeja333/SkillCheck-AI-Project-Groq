import fetch from "node-fetch";
import 'dotenv/config';
const API_KEY = process.env.GEMINI_API_KEY;

async function getModels() {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    const data = await res.json();

    console.log("Available Gemini Models:\n");

    data.models.forEach((model) => {
      console.log(model.name);
    });

  } catch (err) {
    console.error("Error fetching models:", err);
  }
}

getModels();