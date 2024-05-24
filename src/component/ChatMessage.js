// src/components/ChatMessage.js
import React from "react";
import { FaStar } from "react-icons/fa";

const ChatMessage = ({ message }) => {
    const [rating, setRating] = React.useState(null);
    const [hover, setHover] = React.useState(null);
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
                    <div className="whitespace-pre-wrap">{message.text}</div>
                </div>
            </div>
            {message.sender === "bot" && (
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
                                    onClick={() => setRating(ratingValue)}
                                />
                                <FaStar
                                    className="star cursor-pointer"
                                    color={
                                        ratingValue <= (hover || rating)
                                            ? "#ffc107"
                                            : "#e4e5e9"
                                    }
                                    size={30}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                />
                            </label>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ChatMessage;
