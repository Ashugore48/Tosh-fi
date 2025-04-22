import React from "react";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <div style={{ padding: "2rem", marginTop: "2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.3rem", color: "#4a90e2" }}>About Me 💀</h2>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          Hey! I'm Ashutosh, and I made this website to brush up on my React
          skills. It’s still a work in progress, so thanks for being patient!
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          🚨 Right now, the site shows a lot of toast messages (those little
          popups)—I know, it’s a bit too chatty. Just ignore them for now.
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          🖼️ The profile picture doesn’t load the first time. Classic shy
          behavior. A refresh usually helps! Or go to inspect, copy the URL,
          paste it in another tab—and boom! Your profile pic appears.
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          📦 Small dev tip: Before importing anything, I like to export it first
          so I know exactly what I’m working with—makes life easier!
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          📱 This site isn’t responsive yet, so please use it on a laptop or
          desktop. Your thumbs will thank you.
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          🔐 The “Reset Balance” button? Yeah... it’s just there for moral
          support. Doesn’t work yet.
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          💸 For the graph feature, I had to use an older version of React
          (18.3.1), because the newer ones were being dramatic. But hey—it
          works!
        </p>
        <p style={{ fontSize: "0.85rem", marginTop: "1rem" }}>
          📊 Side note: I write more bugs than code, but that’s
          character-building. If the app breaks—shhh, it’s a feature. PS: If
          site did crash just remove everything from url and hit enter. And if
          it still doesn't work, Please let me know.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default About;
