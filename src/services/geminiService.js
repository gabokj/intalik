import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default async function gerarDescricaoComGemini(imageBuffer) {
    const prompt = 
    "Gere uma descrição em portugues do Brasil para seguinte imagem";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("Base64"),
                mimeType: "image/png",
            },
        };
        const res = await model.generateContent([prompt, image]);
        return res.response.text() || "Alt-text não disponivel.";
    } catch (erro) {
        console.error("Erro ao obter alt-text:", erro.message, erro);
        throw new Error("Erro ao obter o alt-text do Gemini.");
    }
}