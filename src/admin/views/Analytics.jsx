import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  Users,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import StatsChart from "../components/StatsChart";
import "./Analytics.css";

const mockAnalytics = {
  totalViews: 124580,
  viewsChange: 12.5,
  uniqueVisitors: 45230,
  visitorsChange: 8.2,
  avgReadTime: "4:32",
  readTimeChange: 5.1,
  bounceRate: 42.3,
  bounceChange: -3.2,
};

const mockTopPosts = [
  {
    id: 1,
    title: "The Complete Guide to CSS Grid",
    views: 15420,
    readTime: "6:45",
    trend: "up",
  },
  {
    id: 2,
    title: "React Hooks Explained",
    views: 12890,
    readTime: "8:20",
    trend: "up",
  },
  {
    id: 3,
    title: "Node.js Best Practices 2025",
    views: 11245,
    readTime: "10:15",
    trend: "down",
  },
  {
    id: 4,
    title: "Building Your First API",
    views: 9876,
    readTime: "7:30",
    trend: "up",
  },
  {
    id: 5,
    title: "Understanding Async/Await",
    views: 8654,
    readTime: "5:45",
    trend: "stable",
  },
  {
    id: 6,
    title: "TypeScript for Beginners",
    views: 7892,
    readTime: "9:10",
    trend: "up",
  },
  {
    id: 7,
    title: "Modern JavaScript Features",
    views: 6543,
    readTime: "6:20",
    trend: "down",
  },
  {
    id: 8,
    title: "Database Design Patterns",
    views: 5987,
    readTime: "11:05",
    trend: "up",
  },
];

const mockTrafficSources = [
  { source: "Organic Search", visitors: 18500, percentage: 41 },
  { source: "Direct", visitors: 12300, percentage: 27 },
  { source: "Social Media", visitors: 8900, percentage: 20 },
  { source: "Referral", visitors: 3600, percentage: 8 },
  { source: "Email", visitors: 1900, percentage: 4 },
];

function Analytics() {
  const [period, setPeriod] = useState("week");

  return (
    <div className="analytics-page animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Analytics</h1>
          <p className="page-description">Track your blog's performance</p>
        </div>
        <div className="period-selector">
          <button
            className={`period-btn ${period === "week" ? "active" : ""}`}
            onClick={() => setPeriod("week")}
          >
            Week
          </button>
          <button
            className={`period-btn ${period === "month" ? "active" : ""}`}
            onClick={() => setPeriod("month")}
          >
            Month
          </button>
          <button
            className={`period-btn ${period === "year" ? "active" : ""}`}
            onClick={() => setPeriod("year")}
          >
            Year
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="analytics-stats">
        <div className="admin-card stats-card">
          <div className="stats-icon views">
            <Eye size={24} />
          </div>
          <div className="stats-content">
            <span className="stats-label">Total Views</span>
            <span className="stats-value">
              {mockAnalytics.totalViews.toLocaleString()}
            </span>
            <span
              className={`stats-change ${
                mockAnalytics.viewsChange >= 0 ? "positive" : "negative"
              }`}
            >
              {mockAnalytics.viewsChange >= 0 ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {Math.abs(mockAnalytics.viewsChange)}%
            </span>
          </div>
        </div>

        <div className="admin-card stats-card">
          <div className="stats-icon visitors">
            <Users size={24} />
          </div>
          <div className="stats-content">
            <span className="stats-label">Unique Visitors</span>
            <span className="stats-value">
              {mockAnalytics.uniqueVisitors.toLocaleString()}
            </span>
            <span
              className={`stats-change ${
                mockAnalytics.visitorsChange >= 0 ? "positive" : "negative"
              }`}
            >
              {mockAnalytics.visitorsChange >= 0 ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {Math.abs(mockAnalytics.visitorsChange)}%
            </span>
          </div>
        </div>

        <div className="admin-card stats-card">
          <div className="stats-icon time">
            <Clock size={24} />
          </div>
          <div className="stats-content">
            <span className="stats-label">Avg. Read Time</span>
            <span className="stats-value">{mockAnalytics.avgReadTime}</span>
            <span
              className={`stats-change ${
                mockAnalytics.readTimeChange >= 0 ? "positive" : "negative"
              }`}
            >
              {mockAnalytics.readTimeChange >= 0 ? (
                <ArrowUpRight size={14} />
              ) : (
                <ArrowDownRight size={14} />
              )}
              {Math.abs(mockAnalytics.readTimeChange)}%
            </span>
          </div>
        </div>

        <div className="admin-card stats-card">
          <div className="stats-icon bounce">
            <TrendingDown size={24} />
          </div>
          <div className="stats-content">
            <span className="stats-label">Bounce Rate</span>
            <span className="stats-value">{mockAnalytics.bounceRate}%</span>
            <span
              className={`stats-change ${
                mockAnalytics.bounceChange <= 0 ? "positive" : "negative"
              }`}
            >
              {mockAnalytics.bounceChange <= 0 ? (
                <ArrowDownRight size={14} />
              ) : (
                <ArrowUpRight size={14} />
              )}
              {Math.abs(mockAnalytics.bounceChange)}%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="analytics-charts">
        <div className="admin-card chart-card">
          <div className="card-header">
            <h3 className="card-title">
              <BarChart3 size={18} />
              Traffic Overview
            </h3>
          </div>
          <div className="chart-container">
            <StatsChart />
          </div>
        </div>

        <div className="admin-card sources-card">
          <div className="card-header">
            <h3 className="card-title">Traffic Sources</h3>
          </div>
          <div className="sources-list">
            {mockTrafficSources.map((source) => (
              <div key={source.source} className="source-item">
                <div className="source-info">
                  <span className="source-name">{source.source}</span>
                  <span className="source-visitors">
                    {source.visitors.toLocaleString()}
                  </span>
                </div>
                <div className="source-bar-container">
                  <div
                    className="source-bar"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <span className="source-percentage">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Posts */}
      <div className="admin-card top-posts-section">
        <div className="card-header">
          <h3 className="card-title">
            <FileText size={18} />
            Top Performing Content
          </h3>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Views</th>
              <th>Avg. Read Time</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {mockTopPosts.map((post, index) => (
              <tr key={post.id}>
                <td className="rank-col">
                  <span className="rank-badge">{index + 1}</span>
                </td>
                <td className="title-col">
                  <span className="post-title">{post.title}</span>
                </td>
                <td className="views-col">
                  <span className="views-count">
                    <Eye size={14} />
                    {post.views.toLocaleString()}
                  </span>
                </td>
                <td className="time-col">
                  <span className="read-time">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </td>
                <td className="trend-col">
                  <span className={`trend-indicator ${post.trend}`}>
                    {post.trend === "up" && <TrendingUp size={16} />}
                    {post.trend === "down" && <TrendingDown size={16} />}
                    {post.trend === "stable" && "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Analytics;
