import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./views/Dashboard";
import PostsList from "./views/PostsList";
import PostEditor from "./views/PostEditor";
import Categories from "./views/Categories";
import Tags from "./views/Tags";
import MediaLibrary from "./views/MediaLibrary";
import Comments from "./views/Comments";
import Analytics from "./views/Analytics";
import SEOSettings from "./views/SEOSettings";
import Profile from "./views/Profile";
import Settings from "./views/Settings";
import "./AdminPanel.css";

function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [theme, setTheme] = useState("dark");
  const [editingPostId, setEditingPostId] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("view") || "dashboard";
    const postId = params.get("postId");
    setCurrentView(view);
    if (postId) setEditingPostId(postId);
  }, [location]);

  const handleNavigate = (view, params = {}) => {
    let url = `/admin?view=${view}`;
    if (params.postId) url += `&postId=${params.postId}`;
    navigate(url);
    setCurrentView(view);
    if (params.postId) setEditingPostId(params.postId);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNavigate={handleNavigate} />;
      case "posts":
        return <PostsList onNavigate={handleNavigate} />;
      case "new-post":
        return <PostEditor onNavigate={handleNavigate} />;
      case "edit-post":
        return (
          <PostEditor postId={editingPostId} onNavigate={handleNavigate} />
        );
      case "categories":
        return <Categories />;
      case "tags":
        return <Tags />;
      case "media":
        return <MediaLibrary />;
      case "comments":
        return <Comments />;
      case "analytics":
        return <Analytics />;
      case "seo":
        return <SEOSettings />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings theme={theme} setTheme={setTheme} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`admin-panel ${theme}`}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <main className={`admin-main ${sidebarCollapsed ? "expanded" : ""}`}>
        <div className="admin-content">{renderView()}</div>
      </main>
    </div>
  );
}

export default AdminPanel;
