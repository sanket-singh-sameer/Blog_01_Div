import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  FolderTree,
  Tags,
  Image,
  MessageSquare,
  BarChart3,
  Search as SearchIcon,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import "./Sidebar.css";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    id: "posts",
    label: "Posts",
    icon: FileText,
    submenu: [
      { id: "posts", label: "All Posts" },
      { id: "new-post", label: "New Post" },
    ],
  },
  { id: "categories", label: "Categories", icon: FolderTree },
  { id: "tags", label: "Tags", icon: Tags },
  { id: "media", label: "Media", icon: Image },
  { id: "comments", label: "Comments", icon: MessageSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "seo", label: "SEO", icon: SearchIcon },
];

const bottomMenuItems = [
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

function Sidebar({ collapsed, onToggle, currentView, onNavigate, onLogout }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleMenuClick = (item) => {
    if (item.submenu) {
      setExpandedMenu(expandedMenu === item.id ? null : item.id);
    } else {
      onNavigate(item.id);
    }
  };

  const isActive = (itemId) => {
    return currentView === itemId;
  };

  const isParentActive = (item) => {
    if (item.submenu) {
      return item.submenu.some((sub) => sub.id === currentView);
    }
    return false;
  };

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!collapsed && <span className="logo-text">Divyam's BLG.</span>}
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${
                  isActive(item.id) || isParentActive(item) ? "active" : ""
                }`}
                onClick={() => handleMenuClick(item)}
              >
                <item.icon size={20} className="nav-icon" />
                {!collapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    {item.submenu && (
                      <ChevronRight
                        size={16}
                        className={`nav-arrow ${
                          expandedMenu === item.id ? "rotated" : ""
                        }`}
                      />
                    )}
                  </>
                )}
              </button>
              {item.submenu && !collapsed && expandedMenu === item.id && (
                <ul className="nav-submenu">
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id}>
                      <button
                        className={`nav-sublink ${
                          isActive(subItem.id) ? "active" : ""
                        }`}
                        onClick={() => onNavigate(subItem.id)}
                      >
                        {subItem.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <ul className="nav-list">
          {bottomMenuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${isActive(item.id) ? "active" : ""}`}
                onClick={() => onNavigate(item.id)}
              >
                <item.icon size={20} className="nav-icon" />
                {!collapsed && <span className="nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
          <li className="nav-item">
            <button className="nav-link logout" onClick={onLogout}>
              <LogOut size={20} className="nav-icon" />
              {!collapsed && <span className="nav-label">Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
