import React, { useState } from "react";
import ChatMessage from "../component/ChatMessage";
import { sendMessageToBot } from "../services/chatService";
import { useNavigate } from "react-router-dom";

function ChatPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();

    const handleLogoClick = () => {
        navigation("/feedback");
    };

    const handleSend = async () => {
        if (input.trim()) {
            // 사용자 메시지 추가.
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: input, sender: "user" },
            ]);
            setInput("");
            // 로딩 상태로 설정
            setIsLoading(true);
            // 비동기 작업 시뮬레이션 (예: API 호출)

            try {
                const botResponse = await sendMessageToBot(input);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        text: botResponse.answer,
                        sender: "bot",
                        qna_id: botResponse.id,
                        similarity: botResponse.similarity,
                    },
                ]);
            } catch (error) {
                console.error(error);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "봇 응답에 실패했습니다.", sender: "bot" },
                ]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.isComposing || e.keyCode === 229) return;
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex justify-between  p-4 bg-blue-500 text-white">
                <div className="flex flex-row text-2xl font-bold items-end">
                    <h1 className="text-2xl font-bold ">판례 질답 시스템</h1>
                    <h1
                        className="text-xl font-bold ml-12 cursor-pointer"
                        onClick={handleLogoClick}
                    >
                        전문가 페이지로 이동
                    </h1>
                </div>

                <h1 className="px-10 text-2xl font-bold">Team HEY</h1>
            </div>
            <div className="flex-1 p-4 overflow-auto">
                <div className="mx-1">
                    {messages.map((message, index) => (
                        <ChatMessage
                            key={index}
                            message={message}
                            isStarVisible={true}
                            qnaId={message.qna_id}
                        />
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="my-2 p-3 rounded-lg bg-gray-300 text-black">
                                <div className="whitespace-pre-wrap">...</div>
                            </div>
                        </div>
                    )}
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

export default ChatPage;
