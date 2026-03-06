"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: "Hi! I'm your Cambry AI Assistant. Ask me anything about universities, countries, or courses!" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, history: messages.slice(1) }) // slice(1) to avoid sending the initial hardcoded greeting if possible, but keeping it is fine.
            });

            if (!res.ok) throw new Error("API Error");

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4 animate-fade-up origin-bottom-right" style={{ height: '500px', maxHeight: '70vh' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[var(--brand-blue)] to-blue-900 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Bot className="w-6 h-6 text-blue-200" />
                            <div>
                                <h3 className="font-bold">Cambry AI</h3>
                                <p className="text-xs text-blue-200">Usually replies instantly</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-[var(--brand-yellow)] text-white rounded-tr-sm' : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-tl-sm'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 shadow-sm p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 text-[var(--brand-yellow)] animate-spin" />
                                    <span className="text-xs text-gray-400">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about study abroad..."
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[var(--brand-yellow)] transition-colors"
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="w-10 h-10 rounded-full bg-[var(--brand-blue)] text-white flex items-center justify-center hover:bg-[var(--brand-blue)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-gradient-to-r from-[var(--brand-blue)] to-blue-900 rounded-full text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform relative group"
                >
                    <MessageCircle className="w-6 h-6" />
                    {/* Notification bubble */}
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
                        Chat with our AI Assistant!
                        <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-8 border-transparent border-l-white"></div>
                    </div>
                </button>
            )}
        </div>
    );
}
