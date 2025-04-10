import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "4rem",
        padding: "1rem",
        textAlign: "center",
        fontSize: "0.85rem",
        backgroundColor: "#f0f0f0",
        color: "#333",
      }}
    >
      <p>Connect with me 👇</p>
      <div style={{ marginTop: "0.5rem" }}>
        <a
          href="https://github.com/Ashugore48"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#000", textDecoration: "none" }}
        >
          🐙 GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/ashutosh-gore-87871620b/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#0077b5", textDecoration: "none" }}
        >
          💼 LinkedIn
        </a>
        <a
          href="https://www.instagram.com/ashutoshgore21/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 10px", color: "#E1306C", textDecoration: "none" }}
        >
          📸 Instagram
        </a>
      </div>
      <p style={{ marginTop: "1rem", color: "#888" }}>
        © {new Date().getFullYear()} Ashutosh's React Playground
      </p>
    </footer>
  );
};

export default Footer;
