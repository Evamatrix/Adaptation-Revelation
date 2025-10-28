import React from 'react';
import './UserProfile.css';

export default function UserProfile() {
  return (
    <div className="user-profile">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-photo"></div>
        <div className="header-text">
          <h1 className="greeting">Hello,</h1>
          <h2 className="name">First Last</h2>
          <p className="pronouns">they/them</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="info">
        <div className="info-block">
          <p className="info-label">Nationality</p>
          <p className="info-value">Example Nationality</p>
        </div>
        <div className="info-block">
          <p className="info-label">Languages</p>
          <p className="info-value">Example Languages</p>
        </div>
        <div className="info-block">
          <p className="info-label">Religion</p>
          <p className="info-value">Example Religion</p>
        </div>
        <div className="info-block">
          <p className="info-label">Interests</p>
          <p className="info-value">Interest 1, Interest 2</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <button className="edit-button">Edit Profile</button>

      {/* Bottom Menu */}
      <div className="menu">
        <div className="menu-icon">🏠</div>
        <div className="menu-icon">🧭</div>
        <div className="menu-icon">💬</div>
        <div className="menu-icon">👤</div>
      </div>
    </div>
  );
}
