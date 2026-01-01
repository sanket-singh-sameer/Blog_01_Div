import {
  FileText,
  Eye,
  TrendingUp,
  Edit3,
  Plus,
  ArrowUpRight,
  Clock,
  Sparkles,
} from "lucide-react";
import "./Dashboard.css";

const mockStats = [
  { label: "Posts", value: 47, icon: FileText, color: "cyan" },
  { label: "Published", value: 38, icon: Sparkles, color: "green" },
  { label: "Drafts", value: 9, icon: Edit3, color: "amber" },
  { label: "Views", value: "124.5K", icon: Eye, color: "purple" },
];

const mockRecentPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    status: "published",
    updatedAt: "2h ago",
  },
  {
    id: 2,
    title: "Understanding TypeScript Generics",
    status: "draft",
    updatedAt: "5h ago",
  },
  {
    id: 3,
    title: "My Journey Learning Rust",
    status: "published",
    updatedAt: "1d ago",
  },
  {
    id: 4,
    title: "Design Patterns in Modern JavaScript",
    status: "published",
    updatedAt: "2d ago",
  },
];

function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard animate-fadeIn">
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
        </div>
        <button className="new-post-btn" onClick={() => onNavigate("new-post")}>
          <Plus size={18} />
          <span>New Post</span>
        </button>
      </header>

      <section className="stats-row">
        {mockStats.map((stat) => (
          <div key={stat.label} className={`stat-item ${stat.color}`}>
            <stat.icon size={18} strokeWidth={2} />
            <div className="stat-data">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </section>

      <div className="dash-content">
        <section className="dash-section">
          <div className="section-head">
            <h2>
              <Clock size={16} />
              Recent
            </h2>
            <button className="link-btn" onClick={() => onNavigate("posts")}>
              View all
              <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="post-list">
            {mockRecentPosts.map((post) => (
              <article
                key={post.id}
                className="post-row"
                onClick={() => onNavigate("edit-post", { postId: post.id })}
              >
                <div className="post-info">
                  <h3>{post.title}</h3>
                  <span className="post-meta">
                    <span className={`dot ${post.status}`} />
                    {post.updatedAt}
                  </span>
                </div>
                <ArrowUpRight size={16} className="post-arrow" />
              </article>
            ))}
          </div>
        </section>

        <section className="dash-section actions-section">
          <div className="section-head">
            <h2>Quick Actions</h2>
          </div>
          <div className="actions-list">
            <button onClick={() => onNavigate("new-post")}>
              <Plus size={18} />
              Write a new post
            </button>
            <button onClick={() => onNavigate("posts")}>
              <FileText size={18} />
              Manage posts
            </button>
            <button onClick={() => onNavigate("analytics")}>
              <TrendingUp size={18} />
              View analytics
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
