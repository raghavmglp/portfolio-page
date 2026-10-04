import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
