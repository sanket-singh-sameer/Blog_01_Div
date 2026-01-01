import { useState } from "react";
import { Plus, Edit3, Trash2, X } from "lucide-react";
import "./Categories.css";

const mockCategories = [
  { id: 1, name: "React", slug: "react", count: 12, color: "#61DAFB", description: "React.js tutorials and guides" },
  { id: 2, name: "TypeScript", slug: "typescript", count: 8, color: "#3178C6", description: "TypeScript patterns and tips" },
  { id: 3, name: "JavaScript", slug: "javascript", count: 15, color: "#F7DF1E", description: "JavaScript fundamentals" },
  { id: 4, name: "CSS", slug: "css", count: 6, color: "#1572B6", description: "CSS layouts and styling" },
  { id: 5, name: "Node.js", slug: "nodejs", count: 9, color: "#339933", description: "Backend development" },
  { id: 6, name: "Rust", slug: "rust", count: 4, color: "#CE412B", description: "Learning Rust" },
  { id: 7, name: "Personal", slug: "personal", count: 7, color: "#8B5CF6", description: "Personal thoughts" },
];

function Categories() {
  const [categories, setCategories] = useState(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", color: "#00B4D8" });

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, description: category.description, color: category.color });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", description: "", color: "#00B4D8" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSave = () => {
    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");
    if (editingCategory) {
      setCategories(categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, ...formData, slug } : cat
      ));
    } else {
      setCategories([...categories, { id: Date.now(), ...formData, slug, count: 0 }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1 className="page-title">Categories</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={16} />
          New Category
        </button>
      </div>

      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.id} className="category-row">
            <div className="category-color" style={{ background: category.color }} />
            <div className="category-info">
              <span className="category-name">{category.name}</span>
              <span className="category-slug">/{category.slug}</span>
            </div>
            <span className="category-desc">{category.description}</span>
            <span className="category-count">{category.count} posts</span>
            <div className="category-actions">
              <button className="icon-btn" onClick={() => handleOpenModal(category)}>
                <Edit3 size={14} />
              </button>
              <button className="icon-btn danger" onClick={() => handleDelete(category.id)}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingCategory ? "Edit Category" : "New Category"}</h2>
              <button className="icon-btn" onClick={handleCloseModal}>
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="admin-input"
                  placeholder="Category name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="admin-input"
                  placeholder="Brief description..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <div className="color-row">
                  <input
                    type="color"
                    className="color-picker"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>
                {editingCategory ? "Save" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
