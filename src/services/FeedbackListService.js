export const getFeedbackList = async () => {
    try {
        const url = `http://localhost:8000/waiting-questions`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(response);
            throw new Error("Failed to get feedback list");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
