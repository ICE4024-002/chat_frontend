export const sendMessageToBot = async (question) => {
    try {
        const requestBody = { question };
        const url = `http://119.197.252.21:9000/answer`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            console.error(response);
            throw new Error("Failed to send message to bot");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// export const postUserFeedback = async (feedback) => {
