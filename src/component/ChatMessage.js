// src/components/ChatMessage.js
import React from "react";
import { FaStar } from "react-icons/fa";
import { postUserFeedback } from "../services/postUserFeedbackService";
import ReactMarkdown from "react-markdown";

const ChatMessage = ({ message, isStarVisible, qnaId }) => {
    const [rating, setRating] = React.useState(null);
    const [hover, setHover] = React.useState(null);

    const handleRatingClick = async (ratingValue) => {
        setRating(ratingValue);
        try {
            const response = await postUserFeedback(qnaId, ratingValue);
            if (response) {
                alert("평가가 등록되었습니다.");
            } else {
                alert("평가 등록에 실패했습니다.");
            }
        } catch (error) {
            console.error(error);
            alert("평가 등록에 실패했습니다.");
        }
    };
    return (
        <div>
            <div
                className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
                <div
                    className={`my-2 p-3 rounded-lg ${
                        message.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-600"
                    }`}
                >
                    <div className="whitespace-pre-wrap">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                    </div>
                </div>
            </div>
            {message.sender === "bot" && qnaId && (
                <div className="flex justify-start">
                    판례 유사도: {parseFloat(message.similarity).toFixed(2)}
                </div>
            )}
            {message.sender === "bot" && qnaId && (
                <div className="flex justify-start my-2">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    className="hidden"
                                    value={ratingValue}
                                    onClick={() =>
                                        handleRatingClick(ratingValue)
                                    }
                                />
                                {isStarVisible && (
                                    <FaStar
                                        className="star cursor-pointer"
                                        color={
                                            ratingValue <= (hover || rating)
                                                ? "#ffc107"
                                                : "#e4e5e9"
                                        }
                                        size={30}
                                        onMouseEnter={() =>
                                            setHover(ratingValue)
                                        }
                                        onMouseLeave={() => setHover(null)}
                                    />
                                )}
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
