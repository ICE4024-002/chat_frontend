export const sendMessageToBot = async (question) => {
    try {
        const queryParams = new URLSearchParams({ question }).toString();
        const url = `http://localhost:8000/answer?${queryParams}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
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
