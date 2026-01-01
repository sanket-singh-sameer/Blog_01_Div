import { useState, useEffect } from "react";
import {
  FileText,
  Eye,
  TrendingUp,
  TrendingDown,
  Clock,
  Edit3,
  Plus,
  ArrowRight,
  BookOpen,
  MessageSquare,
  BarChart2,
} from "lucide-react";
import StatsChart from "../components/StatsChart";
import "./Dashboard.css";

const mockStats = {
  totalPosts: 47,
  publishedPosts: 38,
  drafts: 9,
  totalViews: 124580,
  viewsChange: 12.5,
  postsChange: 8.3,
};

const mockRecentPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications",
    status: "published",
    updatedAt: "2 hours ago",
    views: 1247,
  },
  {
    id: 2,
    title: "Understanding TypeScript Generics",
    status: "draft",
    updatedAt: "5 hours ago",
    views: 0,
  },
  {
    id: 3,
    title: "My Journey Learning Rust",
    status: "published",
    updatedAt: "1 day ago",
    views: 892,
  },
  {
    id: 4,
    title: "Design Patterns in Modern JavaScript",
    status: "published",
    updatedAt: "2 days ago",
    views: 2103,
  },
];

const mockTopPosts = [
  { id: 1, title: "The Complete Guide to CSS Grid", views: 15420, trend: "up" },
  { id: 2, title: "React Hooks Explained", views: 12890, trend: "up" },
  { id: 3, title: "Node.js Best Practices 2025", views: 11245, trend: "down" },
  { id: 4, title: "Building Your First API", views: 9876, trend: "up" },
  { id: 5, title: "Understanding Async/Await", views: 8654, trend: "stable" },
];

function Dashboard({ onNavigate }) {
  const [stats, setStats] = useState(mockStats);
  const [recentPosts, setRecentPosts] = useState(mockRecentPosts);
  const [topPosts, setTopPosts] = useState(mockTopPosts);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="dashboard animate-fadeIn">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">
            Welcome back! Here's an overview of your blog.
          </p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => onNavigate("new-post")}
        >
          <Plus size={18} />
          New Post
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="admin-card stats-card">
          <div className="stats-icon">
            <FileText size={24} />
          </div>
          <div className="stats-value">{stats.totalPosts}</div>
          <div className="stats-label">Total Posts</div>
          <div
            className={`stats-change ${
              stats.postsChange >= 0 ? "positive" : "negative"
            }`}
          >
            {stats.postsChange >= 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(stats.postsChange)}% this month
          </div>
        </div>

        <div className="admin-card stats-card">
          <div className="stats-icon published">
            <BookOpen size={24} />
          </div>
          <div className="stats-value">{stats.publishedPosts}</div>
          <div className="stats-label">Published</div>
        </div>

        <div className="admin-card stats-card">
          <div className="stats-icon drafts">
            <Edit3 size={24} />
          </div>
          <div className="stats-value">{stats.drafts}</div>
          <div className="stats-label">Drafts</div>
        </div>

        <div className="admin-card stats-card">
          <div className="stats-icon views">
            <Eye size={24} />
          </div>
          <div className="stats-value">{stats.totalViews.toLocaleString()}</div>
          <div className="stats-label">Total Views</div>
          <div
            className={`stats-change ${
              stats.viewsChange >= 0 ? "positive" : "negative"
            }`}
          >
            {stats.viewsChange >= 0 ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {Math.abs(stats.viewsChange)}% this month
          </div>
        </div>
      </div>

      {/* Charts & Lists */}
      <div className="dashboard-grid">
        {/* Views Chart */}
        {/* <div className="admin-card chart-card">
          <div className="card-header">
            <h3 className="card-title">
              <BarChart2 size={20} />
              Views Over Time
            </h3>
            <div className="chart-period-selector">
              <button className="period-btn active">Week</button>
              <button className="period-btn">Month</button>
              <button className="period-btn">Year</button>
            </div>
          </div>
          <div className="chart-container">
            <StatsChart />
          </div>
        </div> */}

        {/* Recent Activity */}
        {/* <div className="admin-card activity-card">
          <div className="card-header">
            <h3 className="card-title">
              <Clock size={20} />
              Recent Activity
            </h3>
            <button
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={() => onNavigate("posts")}
            >
              View All
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="activity-list">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="activity-item"
                onClick={() => onNavigate("edit-post", { postId: post.id })}
              >
                <div className="activity-content">
                  <h4 className="activity-title">{post.title}</h4>
                  <div className="activity-meta">
                    <span className={`status-badge ${post.status}`}>
                      {post.status}
                    </span>
                    <span className="activity-time">{post.updatedAt}</span>
                  </div>
                </div>
                {post.views > 0 && (
                  <div className="activity-views">
                    <Eye size={14} />
                    {post.views.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* Top Posts */}
        {/* <div className="admin-card top-posts-card">
          <div className="card-header">
            <h3 className="card-title">
              <TrendingUp size={20} />
              Top Performing Posts
            </h3>
          </div>
          <div className="top-posts-list">
            {topPosts.map((post, index) => (
              <div
                key={post.id}
                className="top-post-item"
                onClick={() => onNavigate("edit-post", { postId: post.id })}
              >
                <span className="top-post-rank">{index + 1}</span>
                <div className="top-post-content">
                  <h4 className="top-post-title">{post.title}</h4>
                  <div className="top-post-views">
                    <Eye size={14} />
                    {post.views.toLocaleString()} views
                  </div>
                </div>
                <div className={`top-post-trend ${post.trend}`}>
                  {post.trend === "up" && <TrendingUp size={16} />}
                  {post.trend === "down" && <TrendingDown size={16} />}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Quick Actions */}
        <div className="admin-card quick-actions-card">
          <div className="card-header">
            <h3 className="card-title">Quick Actions</h3>
          </div>
          <div className="quick-actions-grid">
            <button
              className="quick-action"
              onClick={() => onNavigate("new-post")}
            >
              <div className="quick-action-icon">
                <Plus size={24} />
              </div>
              <span>New Post</span>
            </button>
            <button
              className="quick-action"
              onClick={() => onNavigate("media")}
            >
              <div className="quick-action-icon media">
                <Eye size={24} />
              </div>
              <span>Media Library</span>
            </button>
            <button
              className="quick-action"
              onClick={() => onNavigate("comments")}
            >
              <div className="quick-action-icon comments">
                <MessageSquare size={24} />
              </div>
              <span>Comments</span>
            </button>
            <button
              className="quick-action"
              onClick={() => onNavigate("analytics")}
            >
              <div className="quick-action-icon analytics">
                <BarChart2 size={24} />
              </div>
              <span>Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
