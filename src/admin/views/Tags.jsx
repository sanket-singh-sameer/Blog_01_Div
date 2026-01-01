import { useState } from "react";
import { Plus, Edit3, Trash2, Tag, Search, X, Hash } from "lucide-react";
import "./Tags.css";

const mockTags = [
  { id: 1, name: "tutorial", count: 24 },
  { id: 2, name: "guide", count: 18 },
  { id: 3, name: "tips", count: 15 },
  { id: 4, name: "beginner", count: 12 },
  { id: 5, name: "advanced", count: 9 },
  { id: 6, name: "career", count: 7 },
  { id: 7, name: "productivity", count: 11 },
  { id: 8, name: "react", count: 14 },
  { id: 9, name: "typescript", count: 10 },
  { id: 10, name: "javascript", count: 19 },
  { id: 11, name: "css", count: 8 },
  { id: 12, name: "nodejs", count: 6 },
  { id: 13, name: "performance", count: 5 },
  { id: 14, name: "best-practices", count: 13 },
  { id: 15, name: "architecture", count: 4 },
];

function Tags() {
  const [tags, setTags] = useState(mockTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [editValue, setEditValue] = useState("");

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTag = () => {
    const trimmedTag = newTag.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmedTag) return;

    // Check for duplicates
    if (tags.some((t) => t.name === trimmedTag)) {
      alert("Tag already exists!");
      return;
    }

    setTags([...tags, { id: Date.now(), name: trimmedTag, count: 0 }]);
    setNewTag("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleStartEdit = (tag) => {
    setEditingTag(tag.id);
    setEditValue(tag.name);
  };

  const handleSaveEdit = (id) => {
    const trimmedValue = editValue.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmedValue) return;

    // Check for duplicates (excluding current tag)
    if (tags.some((t) => t.name === trimmedValue && t.id !== id)) {
      alert("Tag already exists!");
      return;
    }

    setTags(tags.map((t) => (t.id === id ? { ...t, name: trimmedValue } : t)));
    setEditingTag(null);
  };

  const handleDelete = (id) => {
    setTags(tags.filter((t) => t.id !== id));
  };

  // Sort by count (most used first)
  const sortedTags = [...filteredTags].sort((a, b) => b.count - a.count);

  return (
    <div className="tags-page animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Tags</h1>
          <p className="page-description">Manage your post tags</p>
        </div>
      </div>

      {/* Add Tag & Search */}
      <div className="tags-toolbar admin-card">
        <div className="add-tag-form">
          <div className="tag-input-wrapper">
            <Hash size={16} className="tag-input-icon" />
            <input
              type="text"
              className="tag-input"
              placeholder="Add new tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={handleAddTag}
          >
            <Plus size={16} />
            Add Tag
          </button>
        </div>
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="tags-stats">
        <span className="stat-item">
          <strong>{tags.length}</strong> total tags
        </span>
        <span className="stat-divider">•</span>
        <span className="stat-item">
          <strong>{tags.reduce((acc, t) => acc + t.count, 0)}</strong> total
          uses
        </span>
      </div>

      {/* Tags Grid */}
      <div className="tags-grid admin-card">
        {sortedTags.length > 0 ? (
          sortedTags.map((tag) => (
            <div key={tag.id} className="tag-item">
              {editingTag === tag.id ? (
                <div className="tag-edit-form">
                  <input
                    type="text"
                    className="tag-edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveEdit(tag.id)
                    }
                    autoFocus
                  />
                  <button
                    className="tag-action-btn save"
                    onClick={() => handleSaveEdit(tag.id)}
                  >
                    ✓
                  </button>
                  <button
                    className="tag-action-btn cancel"
                    onClick={() => setEditingTag(null)}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  <div className="tag-content">
                    <Hash size={14} className="tag-hash" />
                    <span className="tag-name">{tag.name}</span>
                    <span className="tag-count">{tag.count}</span>
                  </div>
                  <div className="tag-actions">
                    <button
                      className="tag-action-btn"
                      onClick={() => handleStartEdit(tag)}
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="tag-action-btn delete"
                      onClick={() => handleDelete(tag.id)}
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Tag size={48} className="empty-state-icon" />
            <h3 className="empty-state-title">No tags found</h3>
            <p className="empty-state-description">
              {searchQuery
                ? "Try a different search"
                : "Start by adding your first tag"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tags;
