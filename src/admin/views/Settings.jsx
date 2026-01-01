import { useState } from "react";
import {
  Settings as SettingsIcon,
  Sun,
  Moon,
  Palette,
  Type,
  Layout,
  Sparkles,
  Monitor,
  Bell,
  Shield,
  Save,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import "./Settings.css";

const accentColors = [
  { name: "Cyan", value: "#00B4D8" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Green", value: "#10B981" },
  { name: "Orange", value: "#F59E0B" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
];

const fontOptions = [
  { name: "Montserrat", value: "Montserrat" },
  { name: "Inter", value: "Inter" },
  { name: "Poppins", value: "Poppins" },
  { name: "Plus Jakarta Sans", value: "Plus Jakarta Sans" },
];

const layoutOptions = [
  { name: "Grid", value: "grid", icon: "⊞" },
  { name: "List", value: "list", icon: "≡" },
  { name: "Cards", value: "cards", icon: "◫" },
];

function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("#00B4D8");
  const [headingFont, setHeadingFont] = useState("Montserrat");
  const [bodyFont, setBodyFont] = useState("Roboto");
  const [blogLayout, setBlogLayout] = useState("grid");
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [showEmail, setShowEmail] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setTheme("dark");
    setAccentColor("#00B4D8");
    setHeadingFont("Montserrat");
    setBodyFont("Roboto");
    setBlogLayout("grid");
    setAnimationsEnabled(true);
  };

  return (
    <div className="settings-page animate-fadeIn">
      {}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Settings</h1>
          <p className="page-description">Customize your admin experience</p>
        </div>
        <div className="header-actions">
          <button className="admin-btn admin-btn-ghost" onClick={handleReset}>
            <RotateCcw size={18} />
            Reset to Default
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {saved ? (
              <>
                <CheckCircle size={18} />
                Saved!
              </>
            ) : (
              <>
                <Save size={18} />
                {isSaving ? "Saving..." : "Save Changes"}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="settings-grid">
        {}
        <div className="admin-card settings-section">
          <div className="section-header">
            <div className="section-icon">
              <Monitor size={20} />
            </div>
            <div>
              <h3 className="section-title">Theme</h3>
              <p className="section-description">
                Choose your preferred color scheme
              </p>
            </div>
          </div>

          <div className="theme-options">
            <button
              className={`theme-option ${theme === "light" ? "active" : ""}`}
              onClick={() => setTheme("light")}
            >
              <Sun size={24} />
              <span>Light</span>
            </button>
            <button
              className={`theme-option ${theme === "dark" ? "active" : ""}`}
              onClick={() => setTheme("dark")}
            >
              <Moon size={24} />
              <span>Dark</span>
            </button>
            <button
              className={`theme-option ${theme === "system" ? "active" : ""}`}
              onClick={() => setTheme("system")}
            >
              <Monitor size={24} />
              <span>System</span>
            </button>
          </div>
        </div>

        {}
        <div className="admin-card settings-section">
          <div className="section-header">
            <div className="section-icon palette">
              <Palette size={20} />
            </div>
            <div>
              <h3 className="section-title">Accent Color</h3>
              <p className="section-description">Customize your brand color</p>
            </div>
          </div>

          <div className="color-options">
            {accentColors.map((color) => (
              <button
                key={color.value}
                className={`color-option ${
                  accentColor === color.value ? "active" : ""
                }`}
                style={{ "--color": color.value }}
                onClick={() => setAccentColor(color.value)}
                title={color.name}
              >
                {accentColor === color.value && <CheckCircle size={16} />}
              </button>
            ))}
            <div className="custom-color">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="color-picker"
              />
            </div>
          </div>
        </div>

        {}
        <div className="admin-card settings-section">
          <div className="section-header">
            <div className="section-icon type">
              <Type size={20} />
            </div>
            <div>
              <h3 className="section-title">Typography</h3>
              <p className="section-description">Customize your fonts</p>
            </div>
          </div>

          <div className="form-group">
            <label className="admin-label">Heading Font</label>
            <select
              className="admin-select"
              value={headingFont}
              onChange={(e) => setHeadingFont(e.target.value)}
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="admin-label">Body Font</label>
            <select
              className="admin-select"
              value={bodyFont}
              onChange={(e) => setBodyFont(e.target.value)}
            >
              <option value="Roboto">Roboto</option>
              <option value="Inter">Inter</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Source Sans Pro">Source Sans Pro</option>
            </select>
          </div>

          <div className="font-preview">
            <p className="preview-heading" style={{ fontFamily: headingFont }}>
              Heading Preview
            </p>
            <p className="preview-body" style={{ fontFamily: bodyFont }}>
              Body text preview. The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>

        {}
        <div className="admin-card settings-section">
          <div className="section-header">
            <div className="section-icon layout">
              <Layout size={20} />
            </div>
            <div>
              <h3 className="section-title">Blog Layout</h3>
              <p className="section-description">
                How posts appear on your blog
              </p>
            </div>
          </div>

          <div className="layout-options">
            {layoutOptions.map((layout) => (
              <button
                key={layout.value}
                className={`layout-option ${
                  blogLayout === layout.value ? "active" : ""
                }`}
                onClick={() => setBlogLayout(layout.value)}
              >
                <span className="layout-icon">{layout.icon}</span>
                <span className="layout-name">{layout.name}</span>
              </button>
            ))}
          </div>

          <div className="toggle-row">
            <div className="toggle-info">
              <span className="toggle-label">
                <Sparkles size={16} />
                Animations
              </span>
              <span className="toggle-description">
                Enable smooth transitions
              </span>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>

        {}
        <div className="admin-card settings-section">
          <div className="section-header">
            <div className="section-icon notifications">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="section-title">Notifications</h3>
              <p className="section-description">
                Manage your notification preferences
              </p>
            </div>
          </div>

          <div className="toggle-group">
            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Email Notifications</span>
                <span className="toggle-description">
                  Get notified about new comments
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Comment Notifications</span>
                <span className="toggle-description">
                  Notify when comments need review
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={commentNotifications}
                  onChange={(e) => setCommentNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Weekly Digest</span>
                <span className="toggle-description">
                  Receive weekly analytics summary
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        {}
        <div className="admin-card settings-section">
          <div className="section-header">
            <div className="section-icon privacy">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="section-title">Privacy</h3>
              <p className="section-description">
                Control your data and visibility
              </p>
            </div>
          </div>

          <div className="toggle-group">
            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Analytics Tracking</span>
                <span className="toggle-description">
                  Collect anonymous usage data
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            <div className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Show Email Publicly</span>
                <span className="toggle-description">
                  Display email on your profile
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={showEmail}
                  onChange={(e) => setShowEmail(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
