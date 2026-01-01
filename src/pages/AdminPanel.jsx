import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background";
import Navbar from "../components/Navbar";

function AdminPanel() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    { id: 1, title: "Sample Blog Post 1", status: "Published" },
    { id: 2, title: "Sample Blog Post 2", status: "Draft" },
  ]);

  const handleLogout = () => {
    // Add logout logic here
    navigate("/login");
  };

  return (
    <>
      <Background />
      
    </>
  );
}

export default AdminPanel;
