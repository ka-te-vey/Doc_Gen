const Groq = require('groq-sdk');

// groq instance will use process.env.GROQ_API_KEY which is loaded in server.js
const getGroqInstance = () => {
    return new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
};

const generateDocumentation = async (req, res) => {
    const { content, documentType } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    try {
        const groq = getGroqInstance();
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are an expert technical writer. Generate high-quality documentation based on the provided code snippet and documentation type. 
              Output ONLY the documentation content in Markdown format.

              STRICT FORMATTING RULES:
              If Type is README:
              - # Project Title (Generate a suitable name)
              - ## Description (Overview of what the code does)
              - ## Features (Key functionalities in bullet points)
              - ## Installation (Standard setup instructions)
              - ## Usage (Code examples on how to use)

              If Type is API DOCUMENT:
              - # API Reference
              - ## Overview (Purpose of the API)
              - ## Endpoints:
                - ### [METHOD] /path
                - **Parameters:** (Table of name, type, description)
                - **Response:** (Example JSON structure)

              If Type is CODE EXPLAINATION:
              - # Technical Explanation
              - ## Logic Summary (High-level process)
              - ## Key Components (Breakdown of functions/classes)
              - ## Data Flow (How state/data changes)
              - ## Complexity Analysis (Time & Space)

              Current Type: ${documentType}`
                },
                {
                    role: 'user',
                    content: content
                }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 2048,
        });

        const generatedContent = chatCompletion.choices[0]?.message?.content || 'Failed to generate content.';
        res.json({ generatedContent });
    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'Failed to generate documentation' });
    }
};

module.exports = {
    generateDocumentation,
};
