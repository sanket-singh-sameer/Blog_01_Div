import { useState } from "react";
import {
  MessageSquare,
  Check,
  X,
  Trash2,
  Flag,
  Reply,
  MoreVertical,
  Search,
  Filter,
  User,
  Clock,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import "./Comments.css";

const mockComments = [
  {
    id: 1,
    author: "John Doe",
    email: "john@example.com",
    content:
      "Great article! Really helped me understand React hooks better. Looking forward to more content like this.",
    postTitle: "Understanding React Hooks",
    postSlug: "understanding-react-hooks",
    status: "pending",
    createdAt: "2 hours ago",
    avatar: null,
  },
  {
    id: 2,
    author: "Sarah Smith",
    email: "sarah@example.com",
    content:
      "This is exactly what I was looking for. The code examples are super clear and easy to follow.",
    postTitle: "TypeScript Best Practices",
    postSlug: "typescript-best-practices",
    status: "approved",
    createdAt: "5 hours ago",
    avatar: null,
  },
  {
    id: 3,
    author: "Mike Johnson",
    email: "mike@example.com",
    content:
      "Could you elaborate more on the performance optimization part? I'm having trouble with re-renders in my app.",
    postTitle: "React Performance Guide",
    postSlug: "react-performance-guide",
    status: "pending",
    createdAt: "1 day ago",
    avatar: null,
  },
  {
    id: 4,
    author: "SpamBot",
    email: "spam@spam.com",
    content: "Check out my website for FREE stuff! Click here!!!",
    postTitle: "CSS Grid Tutorial",
    postSlug: "css-grid-tutorial",
    status: "spam",
    createdAt: "2 days ago",
    avatar: null,
  },
];

function Comments() {
  const [comments, setComments] = useState(mockComments);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [commentsEnabled, setCommentsEnabled] = useState(true);

  const filteredComments = comments.filter((comment) => {
    const matchesFilter = filter === "all" || comment.status === filter;
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const pendingCount = comments.filter((c) => c.status === "pending").length;
  const approvedCount = comments.filter((c) => c.status === "approved").length;
  const spamCount = comments.filter((c) => c.status === "spam").length;

  const handleApprove = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: "approved" } : c))
    );
    setOpenDropdown(null);
  };

  const handleReject = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: "rejected" } : c))
    );
    setOpenDropdown(null);
  };

  const handleSpam = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: "spam" } : c))
    );
    setOpenDropdown(null);
  };

  const handleDelete = (id) => {
    setComments(comments.filter((c) => c.id !== id));
    setOpenDropdown(null);
    if (selectedComment?.id === id) setSelectedComment(null);
  };

  const handleReply = () => {
    if (!replyText.trim() || !selectedComment) return;
    // In real app, this would send the reply
    console.log("Replying to:", selectedComment.id, "with:", replyText);
    setReplyText("");
    setSelectedComment(null);
  };

  return (
    <div className="comments-page animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Comments</h1>
          <p className="page-description">Manage comments on your posts</p>
        </div>
        <label className="toggle-option global-toggle">
          <span>Comments Enabled</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={commentsEnabled}
              onChange={(e) => setCommentsEnabled(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </label>
      </div>

      {/* Stats */}
      <div className="comments-stats">
        <button
          className={`stat-card ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          <MessageSquare size={20} />
          <span className="stat-value">{comments.length}</span>
          <span className="stat-label">Total</span>
        </button>
        <button
          className={`stat-card pending ${
            filter === "pending" ? "active" : ""
          }`}
          onClick={() => setFilter("pending")}
        >
          <Clock size={20} />
          <span className="stat-value">{pendingCount}</span>
          <span className="stat-label">Pending</span>
        </button>
        <button
          className={`stat-card approved ${
            filter === "approved" ? "active" : ""
          }`}
          onClick={() => setFilter("approved")}
        >
          <Check size={20} />
          <span className="stat-value">{approvedCount}</span>
          <span className="stat-label">Approved</span>
        </button>
        <button
          className={`stat-card spam ${filter === "spam" ? "active" : ""}`}
          onClick={() => setFilter("spam")}
        >
          <AlertTriangle size={20} />
          <span className="stat-value">{spamCount}</span>
          <span className="stat-label">Spam</span>
        </button>
      </div>

      {/* Search */}
      <div className="comments-toolbar admin-card">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {filteredComments.length > 0 ? (
          filteredComments.map((comment) => (
            <div
              key={comment.id}
              className={`comment-card admin-card ${comment.status}`}
            >
              <div className="comment-header">
                <div className="comment-author">
                  <div className="author-avatar">
                    {comment.avatar ? (
                      <img src={comment.avatar} alt={comment.author} />
                    ) : (
                      <User size={18} />
                    )}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{comment.author}</span>
                    <span className="author-email">{comment.email}</span>
                  </div>
                </div>
                <div className="comment-meta">
                  <span className={`status-badge ${comment.status}`}>
                    {comment.status}
                  </span>
                  <span className="comment-time">{comment.createdAt}</span>
                </div>
              </div>

              <div className="comment-body">
                <p className="comment-content">{comment.content}</p>
                <a
                  href={`/blog/${comment.postSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="comment-post-link"
                >
                  <ExternalLink size={14} />
                  {comment.postTitle}
                </a>
              </div>

              <div className="comment-actions">
                {comment.status === "pending" && (
                  <>
                    <button
                      className="admin-btn admin-btn-sm approve-btn"
                      onClick={() => handleApprove(comment.id)}
                    >
                      <Check size={14} />
                      Approve
                    </button>
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => handleReject(comment.id)}
                    >
                      <X size={14} />
                      Reject
                    </button>
                  </>
                )}
                <button
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  onClick={() => setSelectedComment(comment)}
                >
                  <Reply size={14} />
                  Reply
                </button>
                <div className="dropdown">
                  <button
                    className="admin-btn admin-btn-ghost admin-btn-sm"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === comment.id ? null : comment.id
                      )
                    }
                  >
                    <MoreVertical size={14} />
                  </button>
                  {openDropdown === comment.id && (
                    <div className="dropdown-menu show">
                      <button
                        className="dropdown-item"
                        onClick={() => handleSpam(comment.id)}
                      >
                        <Flag size={16} />
                        Mark as Spam
                      </button>
                      <button
                        className="dropdown-item danger"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state admin-card">
            <MessageSquare size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">No comments found</h3>
            <p className="empty-state-description">
              {searchQuery || filter !== "all"
                ? "Try adjusting your filters"
                : "Comments will appear here when readers respond to your posts"}
            </p>
          </div>
        )}
      </div>

      {/* Reply Modal */}
      {selectedComment && (
        <div className="modal-overlay" onClick={() => setSelectedComment(null)}>
          <div
            className="modal reply-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Reply to {selectedComment.author}</h2>
              <button
                className="admin-btn admin-btn-ghost"
                onClick={() => setSelectedComment(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="original-comment">
                <p>"{selectedComment.content}"</p>
              </div>
              <div className="form-group">
                <label className="admin-label">Your Reply</label>
                <textarea
                  className="admin-textarea"
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="admin-btn admin-btn-secondary"
                onClick={() => setSelectedComment(null)}
              >
                Cancel
              </button>
              <button
                className="admin-btn admin-btn-primary"
                onClick={handleReply}
              >
                <Reply size={16} />
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
