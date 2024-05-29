import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatMessage from "../component/ChatMessage";
import { getFeedbackDetail } from "../services/getFeedbackDetailService";

function FeedbackDetailPage() {
    const { id } = useParams();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getFeedbackDetail(id)
            .then((data) => {
                const newMessages = [
                    { text: data.question, sender: "user" },
                    { text: data.answer, sender: "bot" },
                ];
                setMessages(() => [...newMessages]);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);
    const handleKeyDown = (e) => {
        if (e.isComposing || e.keyCode === 229) return;
        if (e.key === "Enter") {
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex justify-between  p-4 bg-blue-500 text-white">
                <h1 className="text-2xl font-bold">전문가 평가 페이지</h1>
                <h1 className="px-10 text-2xl font-bold">Team HEY</h1>
            </div>
            <div className="flex-1 p-4 overflow-auto">
                <div className="mx-1">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </div>
            </div>
            <div className="flex p-4 bg-white border-t">
                <input
                    type="text"
                    className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="p-2 bg-blue-500 text-white rounded-r-lg">
                    Send
                </button>
            </div>
        </div>
    );
}

export default FeedbackDetailPage;
