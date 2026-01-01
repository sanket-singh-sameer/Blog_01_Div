import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  FolderTree,
  MoreVertical,
  ChevronRight,
  Palette,
  GripVertical,
} from "lucide-react";
import "./Categories.css";

const mockCategories = [
  {
    id: 1,
    name: "React",
    slug: "react",
    count: 12,
    color: "#61DAFB",
    description: "React.js tutorials and guides",
  },
  {
    id: 2,
    name: "TypeScript",
    slug: "typescript",
    count: 8,
    color: "#3178C6",
    description: "TypeScript patterns and tips",
  },
  {
    id: 3,
    name: "JavaScript",
    slug: "javascript",
    count: 15,
    color: "#F7DF1E",
    description: "JavaScript fundamentals and advanced concepts",
  },
  {
    id: 4,
    name: "CSS",
    slug: "css",
    count: 6,
    color: "#1572B6",
    description: "CSS layouts, animations, and styling",
  },
  {
    id: 5,
    name: "Node.js",
    slug: "nodejs",
    count: 9,
    color: "#339933",
    description: "Backend development with Node.js",
  },
  {
    id: 6,
    name: "Rust",
    slug: "rust",
    count: 4,
    color: "#CE412B",
    description: "Learning Rust as a web developer",
  },
  {
    id: 7,
    name: "Personal",
    slug: "personal",
    count: 7,
    color: "#8B5CF6",
    description: "Personal thoughts and reflections",
  },
];

function Categories() {
  const [categories, setCategories] = useState(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#00B4D8",
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        color: category.color,
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", color: "#00B4D8" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "", color: "#00B4D8" });
  };

  const handleSave = () => {
    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");

    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData, slug } : cat
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        slug,
        count: 0,
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    setOpenDropdown(null);
  };

  return (
    <div className="categories-page animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Categories</h1>
          <p className="page-description">
            Organize your posts with categories
          </p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => handleOpenModal()}
        >
          <Plus size={18} />
          New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card admin-card">
            <div className="category-header">
              <div
                className="category-color"
                style={{ background: category.color }}
              ></div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-slug">/{category.slug}</span>
              </div>
              <div className="dropdown">
                <button
                  className="action-btn"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === category.id ? null : category.id
                    )
                  }
                >
                  <MoreVertical size={16} />
                </button>
                {openDropdown === category.id && (
                  <div className="dropdown-menu show">
                    <button
                      className="dropdown-item"
                      onClick={() => handleOpenModal(category)}
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      className="dropdown-item danger"
                      onClick={() => handleDelete(category.id)}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="category-description">{category.description}</p>
            <div className="category-footer">
              <span className="category-count">
                <FolderTree size={14} />
                {category.count} posts
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingCategory ? "Edit Category" : "New Category"}
              </h2>
              <button
                className="admin-btn admin-btn-ghost"
                onClick={handleCloseModal}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="admin-label">Name</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Category name..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label className="admin-label">Description</label>
                <textarea
                  className="admin-textarea"
                  placeholder="Brief description..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label className="admin-label">Color</label>
                <div className="color-picker-wrapper">
                  <input
                    type="color"
                    className="color-picker"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="admin-input color-input"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="admin-btn admin-btn-secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="admin-btn admin-btn-primary"
                onClick={handleSave}
              >
                {editingCategory ? "Save Changes" : "Create Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
