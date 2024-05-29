export const postUserFeedback = async (qna_id, feedback) => {
    try {
        const requestBody = {
            qna_id,
            feedback,
        };
        const url = `http://localhost:8000/questioner-feedback`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            return true;
        } else {
            console.error(response);
            throw new Error("Failed to post user feedback");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
