import "./App.css";
import ChatPage from "./pages/ChatPage";
import FeedbackDetailPage from "./pages/FeedbackDetailPage";
import FeedbackPage from "./pages/FeedbackPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/feedback/:id" element={<FeedbackDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
