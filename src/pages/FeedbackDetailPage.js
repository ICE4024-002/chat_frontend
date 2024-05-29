import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatMessage from "../component/ChatMessage";
import { getFeedbackDetail } from "../services/getFeedbackDetailService";
import { postExpertFeedback } from "../services/postExpertFeedbackService";

function FeedbackDetailPage() {
    const navigation = useNavigate();
    const { id } = useParams();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const handleLogoClick = () => {
        navigation("/feedback");
    };

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
            handleSend();
        }
    };

    const handleSend = async () => {
        if (input.trim()) {
            setInput("");
            const response = await postExpertFeedback(id, input);
            if (response) {
                alert("등록되었습니다.");
                navigation("/feedback");
                window.location.reload();
            } else {
                alert("등록에 실패했습니다.");
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex justify-between  p-4 bg-blue-500 text-white">
                <h1
                    className="text-2xl font-bold cursor-pointer"
                    onClick={handleLogoClick}
                >
                    전문가 평가 페이지
                </h1>
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
                    className="flex-1 p-2 h-16 border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="p-2 bg-blue-500 text-white rounded-r-lg"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default FeedbackDetailPage;
