import { useState, useRef } from "react";
import {
  User,
  Camera,
  Mail,
  MapPin,
  Link as LinkIcon,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Save,
  CheckCircle,
  Edit3,
} from "lucide-react";
import "./Profile.css";

function Profile() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  // Profile data
  const [profile, setProfile] = useState({
    name: "Divyam Singh",
    title: "Full-Stack Developer & Writer",
    email: "divyam@example.com",
    location: "India",
    website: "https://divyamsingh.me",
    avatar: "",
    bio: "I'm a passionate developer who loves building things for the web. Currently exploring the intersection of design and development, while documenting my journey through this blog.",
    nowSection:
      "Currently learning Rust and exploring WebAssembly. Reading 'Designing Data-Intensive Applications'. Working on a new side project.",
  });

  const [socialLinks, setSocialLinks] = useState({
    github: "https://github.com/divyamsingh",
    linkedin: "https://linkedin.com/in/divyamsingh",
    twitter: "https://twitter.com/divyamsingh",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="profile-page animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Profile</h1>
          <p className="page-description">
            Manage your public profile information
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

      <div className="profile-grid">
        {/* Avatar & Basic Info */}
        <div className="admin-card profile-card">
          <div className="avatar-section">
            <div className="avatar-container">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="avatar-image"
                />
              ) : (
                <div className="avatar-placeholder">
                  <User size={48} />
                </div>
              )}
              <button
                className="avatar-upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={16} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
            <div className="avatar-info">
              <h3 className="profile-name">{profile.name}</h3>
              <p className="profile-title">{profile.title}</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="admin-label">
                <User size={14} />
                Full Name
              </label>
              <input
                type="text"
                className="admin-input"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label className="admin-label">
                <Edit3 size={14} />
                Title / Role
              </label>
              <input
                type="text"
                className="admin-input"
                value={profile.title}
                onChange={(e) =>
                  setProfile({ ...profile, title: e.target.value })
                }
                placeholder="e.g., Developer & Writer"
              />
            </div>

            <div className="form-group">
              <label className="admin-label">
                <Mail size={14} />
                Email
              </label>
              <input
                type="email"
                className="admin-input"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label className="admin-label">
                <MapPin size={14} />
                Location
              </label>
              <input
                type="text"
                className="admin-input"
                value={profile.location}
                onChange={(e) =>
                  setProfile({ ...profile, location: e.target.value })
                }
                placeholder="City, Country"
              />
            </div>

            <div className="form-group full-width">
              <label className="admin-label">
                <Globe size={14} />
                Website
              </label>
              <input
                type="url"
                className="admin-input"
                value={profile.website}
                onChange={(e) =>
                  setProfile({ ...profile, website: e.target.value })
                }
                placeholder="https://yoursite.com"
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="admin-card bio-section">
          <div className="section-header">
            <h3 className="section-title">About Me</h3>
            <p className="section-description">
              Write a brief bio about yourself
            </p>
          </div>
          <textarea
            className="admin-textarea bio-textarea"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Tell readers about yourself..."
            rows={6}
          />
          <span className="char-count">
            {profile.bio.length}/500 characters
          </span>
        </div>

        {/* Now Section */}
        <div className="admin-card now-section">
          <div className="section-header">
            <h3 className="section-title">/now</h3>
            <p className="section-description">
              What you're currently focused on
            </p>
          </div>
          <textarea
            className="admin-textarea now-textarea"
            value={profile.nowSection}
            onChange={(e) =>
              setProfile({ ...profile, nowSection: e.target.value })
            }
            placeholder="What are you working on? Reading? Learning?"
            rows={4}
          />
          <p className="now-hint">
            💡 Inspired by{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              nownownow.com
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="admin-card social-section">
          <div className="section-header">
            <h3 className="section-title">Social Links</h3>
            <p className="section-description">Connect your social profiles</p>
          </div>

          <div className="social-links">
            <div className="social-input-group">
              <div className="social-icon github">
                <Github size={20} />
              </div>
              <input
                type="url"
                className="admin-input"
                value={socialLinks.github}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, github: e.target.value })
                }
                placeholder="https://github.com/username"
              />
            </div>

            <div className="social-input-group">
              <div className="social-icon linkedin">
                <Linkedin size={20} />
              </div>
              <input
                type="url"
                className="admin-input"
                value={socialLinks.linkedin}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                }
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="social-input-group">
              <div className="social-icon twitter">
                <Twitter size={20} />
              </div>
              <input
                type="url"
                className="admin-input"
                value={socialLinks.twitter}
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, twitter: e.target.value })
                }
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
