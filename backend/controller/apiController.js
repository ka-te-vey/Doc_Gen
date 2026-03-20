const crypto = require('crypto');
const Groq = require('groq-sdk');

const CACHE_TTL_MS = 15 * 60 * 1000;
const CACHE_MAX_ENTRIES = 100;
const responseCache = new Map();

const getApiKey = () => process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;

const getGroqInstance = () => {
    return new Groq({
        apiKey: getApiKey(),
    });
};

const MODEL_BY_DOCUMENT_TYPE = {
    README: process.env.GROQ_MODEL_README || 'llama-3.1-8b-instant',
    'API DOCUMENT': process.env.GROQ_MODEL_API || 'llama-3.1-8b-instant',
    'CODE EXPLANATION': process.env.GROQ_MODEL_CODE || 'llama-3.1-8b-instant',
};

const MAX_TOKENS_BY_DOCUMENT_TYPE = {
    README: 1100,
    'API DOCUMENT': 1300,
    'CODE EXPLANATION': 1200,
};

const SYSTEM_PROMPT = `You are an expert technical writer.
Return only Markdown documentation.

Formatting by type:
- README: Project Title, Description, Features, Installation, Usage.
- API DOCUMENT: API Reference, Overview, Endpoints with method/path, parameters, and response example.
- CODE EXPLANATION: Technical Explanation, Logic Summary, Key Components, Data Flow, Complexity Analysis.`;

const getCacheKey = (content, documentType) => {
    const hash = crypto.createHash('sha256').update(content).digest('hex');
    return `${documentType || 'README'}:${hash}`;
};

const getCachedResponse = (cacheKey) => {
    const cached = responseCache.get(cacheKey);
    if (!cached) return null;

    if (cached.expiresAt < Date.now()) {
        responseCache.delete(cacheKey);
        return null;
    }

    return cached.generatedContent;
};

const setCachedResponse = (cacheKey, generatedContent) => {
    if (responseCache.size >= CACHE_MAX_ENTRIES) {
        const oldestKey = responseCache.keys().next().value;
        if (oldestKey) responseCache.delete(oldestKey);
    }

    responseCache.set(cacheKey, {
        generatedContent,
        expiresAt: Date.now() + CACHE_TTL_MS,
    });
};

const generateDocumentation = async (req, res) => {
    const { content, documentType } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }

    if (!getApiKey()) {
        return res.status(500).json({ error: 'Missing GROQ API key in backend environment' });
    }

    const selectedType = documentType || 'README';
    const cacheKey = getCacheKey(content, selectedType);
    const cachedContent = getCachedResponse(cacheKey);

    if (cachedContent) {
        return res.json({ generatedContent: cachedContent, cached: true });
    }

    try {
        const groq = getGroqInstance();
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `${SYSTEM_PROMPT}\n\nCurrent Type: ${selectedType}`,
                },
                {
                    role: 'user',
                    content,
                },
            ],
            model: MODEL_BY_DOCUMENT_TYPE[selectedType] || 'llama-3.1-8b-instant',
            temperature: 0.2,
            max_tokens: MAX_TOKENS_BY_DOCUMENT_TYPE[selectedType] || 1200,
        });

        const generatedContent = chatCompletion.choices[0]?.message?.content || 'Failed to generate content.';
        setCachedResponse(cacheKey, generatedContent);
        res.json({ generatedContent });
    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'Failed to generate documentation' });
    }
};

module.exports = {
    generateDocumentation,
};
