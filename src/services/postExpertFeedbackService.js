export const postExpertFeedback = async (qna_id, feedback) => {
    try {
        const requestBody = {
            qna_id,
            feedback,
        };
        const url = `http://119.197.252.21:9000/expert-feedback`;
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
            throw new Error("Failed to post expert feedback");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
