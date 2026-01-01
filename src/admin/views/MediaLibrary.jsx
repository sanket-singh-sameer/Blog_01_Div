import { useState, useRef } from "react";
import {
  Upload,
  Image,
  Trash2,
  Copy,
  Check,
  Search,
  Grid,
  List,
  X,
  FileImage,
  Download,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import "./MediaLibrary.css";

const mockMedia = [
  {
    id: 1,
    name: "hero-image.jpg",
    url: "/images/hero.jpg",
    size: "2.4 MB",
    type: "image/jpeg",
    dimensions: "1920x1080",
    uploadedAt: "2025-12-28",
  },
  {
    id: 2,
    name: "react-tutorial-cover.png",
    url: "/images/react.png",
    size: "1.8 MB",
    type: "image/png",
    dimensions: "1200x630",
    uploadedAt: "2025-12-25",
  },
  {
    id: 3,
    name: "typescript-banner.jpg",
    url: "/images/ts.jpg",
    size: "980 KB",
    type: "image/jpeg",
    dimensions: "1600x900",
    uploadedAt: "2025-12-22",
  },
  {
    id: 4,
    name: "profile-photo.png",
    url: "/images/profile.png",
    size: "450 KB",
    type: "image/png",
    dimensions: "400x400",
    uploadedAt: "2025-12-20",
  },
  {
    id: 5,
    name: "code-screenshot.png",
    url: "/images/code.png",
    size: "1.2 MB",
    type: "image/png",
    dimensions: "1400x800",
    uploadedAt: "2025-12-18",
  },
  {
    id: 6,
    name: "css-grid-example.jpg",
    url: "/images/css.jpg",
    size: "890 KB",
    type: "image/jpeg",
    dimensions: "1200x675",
    uploadedAt: "2025-12-15",
  },
];

function MediaLibrary() {
  const [media, setMedia] = useState(mockMedia);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const fileInputRef = useRef(null);

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleUpload(files);
  };

  const handleUpload = (files) => {
    files.forEach((file) => {
      const newMedia = {
        id: Date.now() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: formatBytes(file.size),
        type: file.type,
        dimensions: "—",
        uploadedAt: new Date().toISOString().split("T")[0],
      };
      setMedia((prev) => [newMedia, ...prev]);
    });
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleCopyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    setMedia(media.filter((m) => m.id !== id));
    if (selectedImage?.id === id) setSelectedImage(null);
  };

  return (
    <div className="media-library animate-fadeIn">
      {}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Media Library</h1>
          <p className="page-description">Upload and manage your images</p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={18} />
          Upload
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>

      <div className="media-toolbar admin-card">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {}
      <div
        className={`upload-zone ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={32} className="upload-icon" />
        <p className="upload-text">
          Drag & drop images here, or click to browse
        </p>
        <span className="upload-hint">Supports: JPG, PNG, GIF, WebP</span>
      </div>

      {}
      <div className={`media-container ${viewMode}`}>
        {filteredMedia.length > 0 ? (
          filteredMedia.map((item) => (
            <div
              key={item.id}
              className={`media-item ${
                selectedImage?.id === item.id ? "selected" : ""
              }`}
              onClick={() => setSelectedImage(item)}
            >
              <div className="media-preview">
                <div
                  className="media-image"
                  style={{ backgroundImage: `url(${item.url})` }}
                />
                <div className="media-overlay">
                  <button
                    className="overlay-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUrl(item.id, item.url);
                    }}
                    title="Copy URL"
                  >
                    {copiedId === item.id ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                  <button
                    className="overlay-btn delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              {viewMode === "list" && (
                <div className="media-info-list">
                  <span className="media-name">{item.name}</span>
                  <span className="media-meta">{item.size}</span>
                  <span className="media-meta">{item.dimensions}</span>
                  <span className="media-meta">{item.uploadedAt}</span>
                </div>
              )}
              {viewMode === "grid" && (
                <div className="media-info-grid">
                  <span className="media-name">{item.name}</span>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FileImage size={64} className="empty-state-icon" />
            <h3 className="empty-state-title">No media found</h3>
            <p className="empty-state-description">
              {searchQuery
                ? "Try a different search"
                : "Upload your first image to get started"}
            </p>
          </div>
        )}
      </div>

      {}
      {selectedImage && (
        <div className="image-detail-panel">
          <div className="detail-header">
            <h3>Image Details</h3>
            <button
              className="admin-btn admin-btn-ghost"
              onClick={() => setSelectedImage(null)}
            >
              <X size={18} />
            </button>
          </div>
          <div className="detail-preview">
            <img src={selectedImage.url} alt={selectedImage.name} />
          </div>
          <div className="detail-info">
            <div className="detail-row">
              <span className="detail-label">Name</span>
              <span className="detail-value">{selectedImage.name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Size</span>
              <span className="detail-value">{selectedImage.size}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Dimensions</span>
              <span className="detail-value">{selectedImage.dimensions}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Type</span>
              <span className="detail-value">{selectedImage.type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Uploaded</span>
              <span className="detail-value">{selectedImage.uploadedAt}</span>
            </div>
          </div>
          <div className="detail-actions">
            <button
              className="admin-btn admin-btn-secondary"
              onClick={() => handleCopyUrl(selectedImage.id, selectedImage.url)}
            >
              {copiedId === selectedImage.id ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
              {copiedId === selectedImage.id ? "Copied!" : "Copy URL"}
            </button>
            <button
              className="admin-btn admin-btn-danger"
              onClick={() => handleDelete(selectedImage.id)}
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediaLibrary;
