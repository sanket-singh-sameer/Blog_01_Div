import { useState } from "react";
import {
  Search,
  Globe,
  FileText,
  Image,
  Settings,
  Save,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import "./SEOSettings.css";

function SEOSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Global SEO Settings
  const [siteTitle, setSiteTitle] = useState(
    "Divyam's Blog | Personal Tech & Life Notes"
  );
  const [siteDescription, setSiteDescription] = useState(
    "A personal blog where I share what I'm learning, building, and thinking about—sometimes technical, sometimes personal."
  );
  const [siteUrl, setSiteUrl] = useState("https://blog.divyamsingh.me");
  const [ogImage, setOgImage] = useState("");

  // Technical SEO
  const [sitemapEnabled, setSitemapEnabled] = useState(true);
  const [robotsTxtEnabled, setRobotsTxtEnabled] = useState(true);
  const [canonicalUrls, setCanonicalUrls] = useState(true);
  const [structuredData, setStructuredData] = useState(true);

  // Social
  const [twitterHandle, setTwitterHandle] = useState("@divyamsingh");
  const [facebookAppId, setFacebookAppId] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="seo-settings-page animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">SEO Settings</h1>
          <p className="page-description">
            Optimize your blog for search engines
          </p>
        </div>
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

      <div className="seo-grid">
        {/* Global Meta */}
        <div className="admin-card seo-section">
          <div className="section-header">
            <div className="section-icon">
              <Globe size={20} />
            </div>
            <div>
              <h3 className="section-title">Global Meta Tags</h3>
              <p className="section-description">
                Default meta information for your site
              </p>
            </div>
          </div>

          <div className="form-group">
            <label className="admin-label">Site Title</label>
            <input
              type="text"
              className="admin-input"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              placeholder="Your blog title..."
            />
            <span className="char-count">{siteTitle.length}/60</span>
          </div>

          <div className="form-group">
            <label className="admin-label">Site Description</label>
            <textarea
              className="admin-textarea"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              placeholder="Describe your blog..."
              rows={3}
            />
            <span className="char-count">{siteDescription.length}/160</span>
          </div>

          <div className="form-group">
            <label className="admin-label">Site URL</label>
            <input
              type="url"
              className="admin-input"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://yourblog.com"
            />
          </div>
        </div>

        {/* Open Graph */}
        <div className="admin-card seo-section">
          <div className="section-header">
            <div className="section-icon og">
              <Image size={20} />
            </div>
            <div>
              <h3 className="section-title">Open Graph / Social</h3>
              <p className="section-description">
                How your content appears on social media
              </p>
            </div>
          </div>

          <div className="form-group">
            <label className="admin-label">Default OG Image</label>
            <div className="image-upload-area">
              {ogImage ? (
                <div className="og-preview">
                  <img src={ogImage} alt="OG Preview" />
                  <button className="remove-btn" onClick={() => setOgImage("")}>
                    ×
                  </button>
                </div>
              ) : (
                <button className="upload-btn">
                  <Image size={24} />
                  <span>Upload Image</span>
                  <span className="hint">Recommended: 1200×630px</span>
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="admin-label">Twitter Handle</label>
            <input
              type="text"
              className="admin-input"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              placeholder="@yourusername"
            />
          </div>

          <div className="form-group">
            <label className="admin-label">Facebook App ID (Optional)</label>
            <input
              type="text"
              className="admin-input"
              value={facebookAppId}
              onChange={(e) => setFacebookAppId(e.target.value)}
              placeholder="Your Facebook App ID"
            />
          </div>
        </div>

        {/* Technical SEO */}
        <div className="admin-card seo-section">
          <div className="section-header">
            <div className="section-icon tech">
              <Settings size={20} />
            </div>
            <div>
              <h3 className="section-title">Technical SEO</h3>
              <p className="section-description">
                Advanced search engine settings
              </p>
            </div>
          </div>

          <div className="toggle-group">
            <label className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Sitemap</span>
                <span className="toggle-description">
                  Auto-generate XML sitemap
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={sitemapEnabled}
                  onChange={(e) => setSitemapEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </label>

            <label className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Robots.txt</span>
                <span className="toggle-description">
                  Allow search engine crawling
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={robotsTxtEnabled}
                  onChange={(e) => setRobotsTxtEnabled(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </label>

            <label className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Canonical URLs</span>
                <span className="toggle-description">
                  Prevent duplicate content issues
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={canonicalUrls}
                  onChange={(e) => setCanonicalUrls(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </label>

            <label className="toggle-row">
              <div className="toggle-info">
                <span className="toggle-label">Structured Data</span>
                <span className="toggle-description">
                  JSON-LD schema markup
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={structuredData}
                  onChange={(e) => setStructuredData(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </label>
          </div>
        </div>

        {/* Preview */}
        <div className="admin-card seo-section preview-section">
          <div className="section-header">
            <div className="section-icon preview">
              <Search size={20} />
            </div>
            <div>
              <h3 className="section-title">Search Preview</h3>
              <p className="section-description">
                How your site appears in search results
              </p>
            </div>
          </div>

          <div className="search-preview">
            <div className="preview-url">{siteUrl}</div>
            <div className="preview-title">
              {siteTitle || "Your Site Title"}
            </div>
            <div className="preview-description">
              {siteDescription || "Your site description will appear here..."}
            </div>
          </div>

          <div className="social-preview">
            <div className="social-preview-header">Social Media Preview</div>
            <div className="social-card">
              <div className="social-image">
                {ogImage ? (
                  <img src={ogImage} alt="Social preview" />
                ) : (
                  <div className="social-placeholder">
                    <Image size={32} />
                  </div>
                )}
              </div>
              <div className="social-content">
                <div className="social-url">
                  {siteUrl.replace("https://", "")}
                </div>
                <div className="social-title">
                  {siteTitle || "Your Site Title"}
                </div>
                <div className="social-desc">
                  {siteDescription?.slice(0, 100) || "Description..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SEOSettings;
