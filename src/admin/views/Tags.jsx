import { useState } from "react";
import { Plus, Edit3, Trash2, Search, X, Hash } from "lucide-react";
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
    if (!trimmedTag || tags.some((t) => t.name === trimmedTag)) return;
    setTags([...tags, { id: Date.now(), name: trimmedTag, count: 0 }]);
    setNewTag("");
  };

  const handleSaveEdit = (id) => {
    const trimmedValue = editValue.trim().toLowerCase().replace(/\s+/g, "-");
    if (!trimmedValue || tags.some((t) => t.name === trimmedValue && t.id !== id)) return;
    setTags(tags.map((t) => (t.id === id ? { ...t, name: trimmedValue } : t)));
    setEditingTag(null);
  };

  const sortedTags = [...filteredTags].sort((a, b) => b.count - a.count);

  return (
    <div className="tags-page">
      <div className="page-header">
        <h1 className="page-title">Tags</h1>
        <div className="header-stats">
          <span>{tags.length} tags</span>
          <span className="dot"></span>
          <span>{tags.reduce((acc, t) => acc + t.count, 0)} uses</span>
        </div>
      </div>

      <div className="tags-toolbar">
        <div className="input-with-icon">
          <Hash size={14} />
          <input
            type="text"
            placeholder="New tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleAddTag}>
          <Plus size={14} /> Add
        </button>
        <div className="input-with-icon search">
          <Search size={14} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="tags-container">
        {sortedTags.length > 0 ? (
          sortedTags.map((tag) => (
            <div key={tag.id} className="tag-chip">
              {editingTag === tag.id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(tag.id)}
                    autoFocus
                  />
                  <button className="chip-btn save" onClick={() => handleSaveEdit(tag.id)}></button>
                  <button className="chip-btn" onClick={() => setEditingTag(null)}></button>
                </>
              ) : (
                <>
                  <Hash size={12} className="hash" />
                  <span className="name">{tag.name}</span>
                  <span className="count">{tag.count}</span>
                  <div className="actions">
                    <button className="chip-btn" onClick={() => { setEditingTag(tag.id); setEditValue(tag.name); }}>
                      <Edit3 size={12} />
                    </button>
                    <button className="chip-btn danger" onClick={() => setTags(tags.filter((t) => t.id !== tag.id))}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="empty">No tags found</div>
        )}
      </div>
    </div>
  );
}

export default Tags;
