import Home from "./home";
import Blog from "./blog/blog";
import { Route, Routes } from "react-router-dom";
import PostPage from "./blog/post";

function BodyMain() {
  return (
    <div className="flex items-center justify-between p-4 max-w-5xl mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default BodyMain;
