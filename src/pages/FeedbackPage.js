import React, { useEffect, useState } from "react";
import { getFeedbackList } from "../services/FeedbackListService";
import { useNavigate } from "react-router-dom";

function FeedbackPage() {
    const [data, setData] = useState([]);
    const navigation = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const questionList = await getFeedbackList();
                setData(questionList);
                console.log(questionList);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleRowClick = (id) => {
        navigation(`/feedback/${id}`);
    };

    const handleLogoClick = () => {
        navigation("/");
    };
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex justify-between p-4 bg-blue-500 text-white">
                <div className="flex flex-row text-2xl font-bold items-end">
                    <h1 className="text-2xl font-bold ">판례 질답 시스템</h1>
                    <h1
                        className="text-xl font-bold ml-12 cursor-pointer"
                        onClick={handleLogoClick}
                    >
                        챗봇 페이지로 이동
                    </h1>
                </div>
                <h1 className="px-10 text-2xl font-bold">Team HEY</h1>
            </div>
            <div className="flex p-4">
                <div className="bg-white shadow-md rounded-lg p-4 overflow-y-auto w-screen">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-14"
                                >
                                    번호
                                </th>
                                <th
                                    scope="col"
                                    className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    질문
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(item.id)}
                                    className="cursor-pointer"
                                >
                                    <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.id}
                                    </td>
                                    <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.question}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FeedbackPage;
