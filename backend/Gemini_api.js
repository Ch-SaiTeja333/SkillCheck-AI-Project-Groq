import axios from "axios";
import "dotenv/config";

/* ================================
   GROQ API CALL
================================ */

export const runApi = async (promptText) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: promptText }],
        temperature: 0.2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      },
    );

    const data = response.data;

    return data.choices[0].message.content;
  } catch (error) {
    console.log("Groq Error:", error);
    return null;
  }
};
/* ================================
   QUESTION GENERATION PROMPT
================================ */

export const buildPrompt = (topic, difficultyLevel, numberOfQuestions) => `
Generate ${numberOfQuestions} multiple-choice questions (MCQs) on the topic "${topic}".
Difficulty level: ${difficultyLevel}.

Rules:
- Each question must have exactly 4 options.
- Provide the correct answer.
- Do NOT include explanations.
- Return ONLY valid JSON.

Format:
[
  {
    "question": "string",
    "options": ["string", "string", "string", "string"],
    "correctAnswer": "string"
  }
]
`;

/* ================================
   FEEDBACK GENERATION PROMPT
================================ */

export const buildFeedbackPrompt = (obj) => `
A user attempted a quiz.

Topic: ${obj.topic}
Difficulty Level: ${obj.difficultyLevel}
Score: ${obj.score}
Percentage: ${obj.percentage}%

Questions and Answers:
${obj.questions
  .map(
    (q, i) => `
Question ${i + 1}: ${q}
Options: ${obj.options.availableOptions[i].join(", ")}
Correct Answer: ${obj.options.correctOptions[i]}
User Answer: ${obj.options.userOptions[i] || "Not Answered"}
`,
  )
  .join("\n")}

Instructions:
- Analyze the user's performance carefully.
- Explain the overall performance in **3-4 sentences**.
- Mention what the user understood well.
- Clearly explain weak areas.
- Give **detailed improvement suggestions**.
- Do NOT repeat the questions.
- Return ONLY valid JSON.

Format:
{
  "overallFeedback": "string (3-4 sentences)",
  "strengths": ["string", "string","string"],
  "weakAreas": ["string", "string","string"],
  "suggestions": ["string", "string", "string"]
}
`;

/* ================================
   TEST DATA
================================ */

const quiz = {
  topic: "DSA",
  difficultyLevel: "easy",
  score: 2,
  percentage: 66.67,
  questions: [
    "Which data structure stores elements in a linear sequence, where each element can be accessed by index?",
    "What is an algorithm primarily used for?",
    "Which data structure follows LIFO?",
  ],
  options: {
    correctOptions: ["Array", "Solving a computational problem", "Stack"],
    userOptions: ["Linked List", "Solving a computational problem", "Queue"],
    availableOptions: [
      ["Linked List", "Tree", "Array", "Graph"],
      [
        "Storing data permanently",
        "Defining syntax",
        "Solving a computational problem",
        "Designing UI",
      ],
      ["Queue", "Stack", "Linked List", "Array"],
    ],
  },
};

/* ================================
   TEST FEEDBACK GENERATION
================================ */

// const prompt = buildFeedbackPrompt(quiz);

// const feedback = await runApi(prompt);

// console.log("AI Feedback:");
// console.log(feedback);

/* ================================
   TEST QUESTION GENERATION
================================ */

// const prompt = buildPrompt("DBMS", "MEDIUM", 5);
// const questions = await runApi(prompt);
// console.log(questions);
