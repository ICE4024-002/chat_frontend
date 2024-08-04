export const getFeedbackDetail = async (id) => {
    try {
        const url = `http://119.197.252.21:9000/waiting-questions/${id}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error(response);
            throw new Error("Failed to get feedback detail");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
