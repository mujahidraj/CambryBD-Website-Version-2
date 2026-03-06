import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not defined in the environment. Please restart the dev server.");
        }

        // 1. Fetch relevant DB context (Countries, Universities, Courses)
        // To avoid exceeding token limits, get a summarized view
        const countries = await prisma.country.findMany({ select: { name: true, description: true } });
        const universities = await prisma.university.findMany({ select: { name: true, location: true, country: { select: { name: true } } } });
        const coursesCount = await prisma.course.count();

        // Build a highly condensed system prompt string
        const contextString = `
        You are an AI Counselor for Cambry, an elite Study Abroad Agency.
        You are helpful, polite, and persuasive, aiming to get students to book a free consultation or apply now.

        Currently, Cambry offers admission to ${countries.length} countries, including:
        ${countries.map(c => `- ${c.name} (${c.description?.slice(0, 50)}...)`).join('\n')}

        We partner with over ${universities.length} universities worldwide, such as:
        ${universities.slice(0, 10).map(u => `- ${u.name} in ${u.location}, ${u.country?.name}`).join('\n')}
        and many more.

        We currently have over ${coursesCount} courses in our system.
        
        Keep answers strictly relevant to study abroad, IELTS, universities, and visas. Do NOT hallucinate data. If you don't know, tell them to book a free consultation.
        `;

        // 2. Initialize Gemini API
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        // Convert history for Gemini format
        const chatHistory = history.map((msg: { role: string; content: string }) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
        }));

        const chat = ai.chats.create({
            model: "gemini-2.5-flash",
            // @ts-ignore
            config: {
                systemInstruction: contextString,
            }
        });

        // 3. Send history + new message
        // Since ai.chats.create() might not support sending history perfectly in all SDK versions, 
        // a safer fallback is a pure generateContent call with the fully constructed history.
        let finalHistory = [{ role: 'user', parts: [{text: "System Instructions: " + contextString}] }, {role: 'model', parts: [{text: "Understood."}]}];
        finalHistory = finalHistory.concat(chatHistory);
        finalHistory.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalHistory as any,
        });

        return NextResponse.json({ reply: response.text });
    } catch (error: any) {
        console.error("Chat API error:", error);
        return NextResponse.json({ error: "Failed to process chat message.", details: error.message, stack: error.stack }, { status: 500 });
    }
}
