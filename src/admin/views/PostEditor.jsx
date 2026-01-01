import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Save,
  Eye,
  Send,
  Clock,
  Image as ImageIcon,
  X,
  Plus,
  Link as LinkIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Minus,
  Undo,
  Redo,
  AlignLeft,
  Star,
  EyeOff,
  Calendar,
  Tag,
  Folder,
  FileText,
  Check,
} from "lucide-react";
import "./PostEditor.css";
const mockCategories = [
  { id: 1, name: "React" },
  { id: 2, name: "JavaScript" },
  { id: 3, name: "TypeScript" },
  { id: 4, name: "CSS" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "Rust" },
  { id: 7, name: "Personal" },
];

const mockTags = [
  "react",
  "javascript",
  "typescript",
  "css",
  "nodejs",
  "tutorial",
  "beginner",
  "advanced",
  "web-development",
  "frontend",
  "backend",
  "rust",
  "programming",
  "career",
  "personal",
  "learning",
];

function PostEditor({ postId, onNavigate }) {
  const isEditing = !!postId;

  const [post, setPost] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: null,
    category: "",
    tags: [],
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    featured: false,
    hidden: false,
    scheduledFor: null,
  });

  const [editorMode, setEditorMode] = useState("write"); // write | preview
  const [showScheduler, setShowScheduler] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [readTime, setReadTime] = useState(0);
  useEffect(() => {
    if (!isEditing && post.title) {
      const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setPost((prev) => ({ ...prev, slug }));
    }
  }, [post.title, isEditing]);
  useEffect(() => {
    const words = post.content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    setReadTime(Math.ceil(words / 200)); // Average reading speed
  }, [post.content]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (post.title || post.content) {
        handleAutoSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(timer);
  }, [post]);

  const handleAutoSave = async () => {
    setLastSaved(new Date());
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPost((prev) => ({ ...prev, status: "draft" }));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handlePublish = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPost((prev) => ({ ...prev, status: "published" }));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleSchedule = async (date) => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPost((prev) => ({
      ...prev,
      status: "scheduled",
      scheduledFor: date,
    }));
    setShowScheduler(false);
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleTagInput = (value) => {
    setTagInput(value);
    if (value.length > 0) {
      const suggestions = mockTags.filter(
        (tag) =>
          tag.toLowerCase().includes(value.toLowerCase()) &&
          !post.tags.includes(tag)
      );
      setTagSuggestions(suggestions.slice(0, 5));
    } else {
      setTagSuggestions([]);
    }
  };

  const handleAddTag = (tag) => {
    if (!post.tags.includes(tag)) {
      setPost((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput("");
    setTagSuggestions([]);
  };

  const handleRemoveTag = (tagToRemove) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      handleAddTag(tagInput.trim().toLowerCase());
    }
  };

  const insertMarkdown = (syntax, placeholder = "") => {
    const textarea = document.getElementById("content-editor");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = post.content.substring(start, end) || placeholder;

    let newText;
    let newCursorPos;

    switch (syntax) {
      case "bold":
        newText = `**${selectedText}**`;
        newCursorPos = start + 2;
        break;
      case "italic":
        newText = `*${selectedText}*`;
        newCursorPos = start + 1;
        break;
      case "h1":
        newText = `# ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case "h2":
        newText = `## ${selectedText}`;
        newCursorPos = start + 3;
        break;
      case "h3":
        newText = `### ${selectedText}`;
        newCursorPos = start + 4;
        break;
      case "quote":
        newText = `> ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case "code":
        newText = `\`${selectedText}\``;
        newCursorPos = start + 1;
        break;
      case "codeblock":
        newText = `\`\`\`\n${selectedText}\n\`\`\``;
        newCursorPos = start + 4;
        break;
      case "link":
        newText = `[${selectedText}](url)`;
        newCursorPos = start + selectedText.length + 3;
        break;
      case "ul":
        newText = `- ${selectedText}`;
        newCursorPos = start + 2;
        break;
      case "ol":
        newText = `1. ${selectedText}`;
        newCursorPos = start + 3;
        break;
      case "hr":
        newText = `\n---\n`;
        newCursorPos = start + 5;
        break;
      default:
        return;
    }

    const newContent =
      post.content.substring(0, start) + newText + post.content.substring(end);

    setPost((prev) => ({ ...prev, content: newContent }));
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        newCursorPos,
        newCursorPos + selectedText.length
      );
    }, 0);
  };
  const renderMarkdown = (text) => {
    let html = text
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(/`(.*?)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/^- (.*$)/gim, "<li>$1</li>")
      .replace(/^(\d+)\. (.*$)/gim, "<li>$2</li>")
      .replace(/^---$/gim, "<hr />")
      .replace(/\n/g, "<br />");

    return html;
  };

  return (
    <div className="post-editor animate-fadeIn">
      {}
      <div className="editor-header">
        <div className="editor-header-left">
          <button className="back-btn" onClick={() => onNavigate("posts")}>
            <ArrowLeft size={20} />
          </button>
          <div className="editor-title-info">
            <h1 className="editor-page-title">
              {isEditing ? "Edit Post" : "New Post"}
            </h1>
            {lastSaved && (
              <span className="last-saved">
                <Check size={14} />
                Saved {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        <div className="editor-actions">
          <button
            className="admin-btn admin-btn-ghost"
            onClick={() =>
              setEditorMode(editorMode === "write" ? "preview" : "write")
            }
          >
            <Eye size={18} />
            {editorMode === "write" ? "Preview" : "Edit"}
          </button>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={handleSaveDraft}
            disabled={isSaving}
          >
            <Save size={18} />
            Save Draft
          </button>
          <div className="publish-dropdown">
            <button
              className="admin-btn admin-btn-primary"
              onClick={handlePublish}
              disabled={isSaving}
            >
              <Send size={18} />
              {isSaving ? "Publishing..." : "Publish"}
            </button>
            <button
              className="schedule-btn"
              onClick={() => setShowScheduler(!showScheduler)}
            >
              <Clock size={16} />
            </button>
            {showScheduler && (
              <div className="schedule-dropdown">
                <h4>Schedule Post</h4>
                <input
                  type="datetime-local"
                  className="admin-input"
                  onChange={(e) => handleSchedule(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="editor-layout">
        {}
        <div className="editor-main">
          {}
          <input
            type="text"
            placeholder="Post title..."
            value={post.title}
            onChange={(e) =>
              setPost((prev) => ({ ...prev, title: e.target.value }))
            }
            className="admin-input admin-input-title"
          />

          {}
          <div className="slug-input-wrapper">
            <span className="slug-prefix">/blog/</span>
            <input
              type="text"
              value={post.slug}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, slug: e.target.value }))
              }
              className="slug-input"
              placeholder="post-slug"
            />
          </div>

          {}
          {editorMode === "write" && (
            <div className="editor-toolbar">
              <div className="toolbar-group">
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("h1", "Heading")}
                  title="Heading 1"
                >
                  <Heading1 size={18} />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("h2", "Heading")}
                  title="Heading 2"
                >
                  <Heading2 size={18} />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("h3", "Heading")}
                  title="Heading 3"
                >
                  <Heading3 size={18} />
                </button>
              </div>
              <div className="toolbar-divider" />
              <div className="toolbar-group">
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("bold", "bold text")}
                  title="Bold (Ctrl+B)"
                >
                  <Bold size={18} />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("italic", "italic text")}
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={18} />
                </button>
              </div>
              <div className="toolbar-divider" />
              <div className="toolbar-group">
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("ul", "List item")}
                  title="Bullet List"
                >
                  <List size={18} />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("ol", "List item")}
                  title="Numbered List"
                >
                  <ListOrdered size={18} />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("quote", "Quote")}
                  title="Blockquote"
                >
                  <Quote size={18} />
                </button>
              </div>
              <div className="toolbar-divider" />
              <div className="toolbar-group">
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("code", "code")}
                  title="Inline Code"
                >
                  <Code size={18} />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("link", "link text")}
                  title="Link"
                >
                  <LinkIcon size={18} />
                </button>
                <button
                  className="toolbar-btn"
                  onClick={() => insertMarkdown("hr")}
                  title="Horizontal Rule"
                >
                  <Minus size={18} />
                </button>
              </div>
            </div>
          )}

          {}
          <div className="content-area">
            {editorMode === "write" ? (
              <textarea
                id="content-editor"
                placeholder="Start writing your post... (Markdown supported)"
                value={post.content}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, content: e.target.value }))
                }
                className="content-editor"
              />
            ) : (
              <div
                className="content-preview"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(post.content),
                }}
              />
            )}
          </div>

          {}
          <div className="word-count-bar">
            <span>{wordCount} words</span>
            <span>·</span>
            <span>{readTime} min read</span>
          </div>
        </div>

        {}
        <div className="editor-sidebar">
          {}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">
              <FileText size={16} />
              Status
            </h3>
            <div className="status-info">
              <span className={`status-badge large ${post.status}`}>
                {post.status}
              </span>
              {post.scheduledFor && (
                <span className="scheduled-date">
                  <Calendar size={14} />
                  {new Date(post.scheduledFor).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="status-toggles">
              <label className="toggle-row">
                <span>Featured Post</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={post.featured}
                    onChange={(e) =>
                      setPost((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </label>
              <label className="toggle-row">
                <span>Hidden/Unlisted</span>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={post.hidden}
                    onChange={(e) =>
                      setPost((prev) => ({ ...prev, hidden: e.target.checked }))
                    }
                  />
                  <span className="toggle-slider"></span>
                </label>
              </label>
            </div>
          </div>

          {}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">
              <ImageIcon size={16} />
              Featured Image
            </h3>
            {post.featuredImage ? (
              <div className="featured-image-preview">
                <img src={post.featuredImage} alt="Featured" />
                <button
                  className="remove-image-btn"
                  onClick={() =>
                    setPost((prev) => ({ ...prev, featuredImage: null }))
                  }
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="image-upload-zone">
                <ImageIcon size={32} />
                <span>Click or drag to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setPost((prev) => ({
                          ...prev,
                          featuredImage: ev.target.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            )}
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-section-title">
              <Folder size={16} />
              Category
            </h3>
            <select
              value={post.category}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, category: e.target.value }))
              }
              className="admin-select"
            >
              <option value="">Select category</option>
              {mockCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">
              <Tag size={16} />
              Tags
            </h3>
            <div className="tags-input-wrapper">
              <input
                type="text"
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => handleTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="admin-input"
              />
              {tagSuggestions.length > 0 && (
                <div className="tag-suggestions">
                  {tagSuggestions.map((tag) => (
                    <button
                      key={tag}
                      className="tag-suggestion"
                      onClick={() => handleAddTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {post.tags.length > 0 && (
              <div className="tags-list">
                {post.tags.map((tag) => (
                  <span key={tag} className="admin-chip">
                    {tag}
                    <button
                      className="admin-chip-remove"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Excerpt</h3>
            <textarea
              placeholder="Brief description for previews..."
              value={post.excerpt}
              onChange={(e) =>
                setPost((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              className="admin-textarea"
              rows={3}
            />
          </div>

          {}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">SEO Settings</h3>
            <div className="form-group">
              <label className="admin-label">Meta Title</label>
              <input
                type="text"
                placeholder="SEO title (defaults to post title)"
                value={post.metaTitle}
                onChange={(e) =>
                  setPost((prev) => ({ ...prev, metaTitle: e.target.value }))
                }
                className="admin-input"
              />
              <span className="char-count">{post.metaTitle.length}/60</span>
            </div>
            <div className="form-group">
              <label className="admin-label">Meta Description</label>
              <textarea
                placeholder="SEO description for search results..."
                value={post.metaDescription}
                onChange={(e) =>
                  setPost((prev) => ({
                    ...prev,
                    metaDescription: e.target.value,
                  }))
                }
                className="admin-textarea"
                rows={2}
              />
              <span className="char-count">
                {post.metaDescription.length}/160
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostEditor;
