import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  ExternalLink,
  ChevronDown,
  FileText,
  Star,
  EyeOff,
} from "lucide-react";
import "./PostsList.css";

const mockPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Modern Patterns",
    slug: "building-scalable-react-applications",
    status: "published",
    category: "React",
    featured: true,
    views: 12450,
    readTime: 8,
    createdAt: "2025-12-28",
    updatedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Understanding TypeScript Generics: A Deep Dive",
    slug: "understanding-typescript-generics",
    status: "draft",
    category: "TypeScript",
    featured: false,
    views: 0,
    readTime: 12,
    createdAt: "2025-12-27",
    updatedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "My Journey Learning Rust as a JavaScript Developer",
    slug: "journey-learning-rust",
    status: "published",
    category: "Rust",
    featured: false,
    views: 8920,
    readTime: 15,
    createdAt: "2025-12-25",
    updatedAt: "1 day ago",
  },
  {
    id: 4,
    title: "Design Patterns in Modern JavaScript",
    slug: "design-patterns-modern-javascript",
    status: "published",
    category: "JavaScript",
    featured: true,
    views: 21030,
    readTime: 10,
    createdAt: "2025-12-20",
    updatedAt: "2 days ago",
  },
  {
    id: 5,
    title: "The Complete Guide to CSS Grid Layout",
    slug: "complete-guide-css-grid",
    status: "scheduled",
    category: "CSS",
    featured: false,
    views: 0,
    readTime: 6,
    createdAt: "2025-12-18",
    updatedAt: "3 days ago",
    scheduledFor: "2025-01-05",
  },
  {
    id: 6,
    title: "Building Your First REST API with Node.js",
    slug: "first-rest-api-nodejs",
    status: "published",
    category: "Node.js",
    featured: false,
    views: 15670,
    readTime: 11,
    createdAt: "2025-12-15",
    updatedAt: "5 days ago",
  },
];

function PostsList({ onNavigate }) {
  const [posts, setPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = [...new Set(mockPosts.map((p) => p.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map((p) => p.id));
    }
  };

  const handleSelectPost = (postId) => {
    setSelectedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const handleDeletePost = (postId) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setOpenDropdown(null);
  };

  const handleToggleFeatured = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, featured: !p.featured } : p))
    );
    setOpenDropdown(null);
  };

  return (
    <div className="posts-list animate-fadeIn">
      {}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Posts</h1>
          <p className="page-description">
            Manage and organize all your blog posts
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

      {}
      <div className="filters-bar admin-card">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-group">
          <div className="filter-select">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div className="filter-select">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="admin-select"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-select">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="admin-select"
            >
              <option value="updatedAt">Last Updated</option>
              <option value="createdAt">Date Created</option>
              <option value="views">Most Views</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {}
      <div className="admin-card posts-table-card">
        {filteredPosts.length > 0 ? (
          <table className="admin-table posts-table">
            <thead>
              <tr>
                <th className="checkbox-col">
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length}
                      onChange={handleSelectAll}
                    />
                    <span className="checkmark"></span>
                  </label>
                </th>
                <th>Title</th>
                <th>Status</th>
                <th>Category</th>
                <th>Views</th>
                <th>Updated</th>
                <th className="actions-col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className={selectedPosts.includes(post.id) ? "selected" : ""}
                >
                  <td className="checkbox-col">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                  <td className="title-col">
                    <div className="post-title-wrapper">
                      <div className="post-title-row">
                        {post.featured && (
                          <Star
                            size={14}
                            className="featured-icon"
                            fill="#F59E0B"
                          />
                        )}
                        <span
                          className="post-title"
                          onClick={() =>
                            onNavigate("edit-post", { postId: post.id })
                          }
                        >
                          {post.title}
                        </span>
                      </div>
                      <span className="post-slug">/{post.slug}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>
                    <span className="category-badge">{post.category}</span>
                  </td>
                  <td className="views-col">
                    {post.views > 0 ? (
                      <span className="views-count">
                        <Eye size={14} />
                        {post.views.toLocaleString()}
                      </span>
                    ) : (
                      <span className="views-count empty">—</span>
                    )}
                  </td>
                  <td className="date-col">{post.updatedAt}</td>
                  <td className="actions-col">
                    <div className="actions-wrapper">
                      <button
                        className="action-btn"
                        onClick={() =>
                          onNavigate("edit-post", { postId: post.id })
                        }
                        title="Edit"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        className="action-btn"
                        onClick={() =>
                          window.open(`/blog/${post.slug}`, "_blank")
                        }
                        title="Preview"
                      >
                        <ExternalLink size={16} />
                      </button>
                      <div className="dropdown">
                        <button
                          className="action-btn"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === post.id ? null : post.id
                            )
                          }
                        >
                          <MoreVertical size={16} />
                        </button>
                        {openDropdown === post.id && (
                          <div className="dropdown-menu show">
                            <button
                              className="dropdown-item"
                              onClick={() => handleToggleFeatured(post.id)}
                            >
                              <Star size={16} />
                              {post.featured
                                ? "Remove Featured"
                                : "Make Featured"}
                            </button>
                            <button className="dropdown-item">
                              <EyeOff size={16} />
                              Make Hidden
                            </button>
                            <button
                              className="dropdown-item danger"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <FileText size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">No posts found</h3>
            <p className="empty-state-description">
              {searchQuery || statusFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters"
                : "Get started by creating your first post"}
            </p>
            {!searchQuery &&
              statusFilter === "all" &&
              categoryFilter === "all" && (
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => onNavigate("new-post")}
                >
                  <Plus size={18} />
                  Create Post
                </button>
              )}
          </div>
        )}
      </div>

      {}
      {selectedPosts.length > 0 && (
        <div className="bulk-actions-bar">
          <span className="selected-count">
            {selectedPosts.length} post{selectedPosts.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <div className="bulk-actions">
            <button className="admin-btn admin-btn-secondary admin-btn-sm">
              Move to Draft
            </button>
            <button className="admin-btn admin-btn-secondary admin-btn-sm">
              Publish
            </button>
            <button className="admin-btn admin-btn-danger admin-btn-sm">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostsList;
