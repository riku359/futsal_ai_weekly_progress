"use strict";

function revealAnchor() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;
  let current = target;
  while (current) {
    if (current.tagName === "DETAILS") current.open = true;
    current = current.parentElement;
  }
  target.scrollIntoView({ block: "start" });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.hljs) window.hljs.highlightAll();
  document.querySelectorAll("[data-models]").forEach((button) => {
    button.addEventListener("click", () => {
      const open = button.dataset.models === "open";
      document.querySelectorAll(".fx033-method").forEach((details) => {
        details.open = open;
      });
      if (!open) document.querySelectorAll(".fx033-clip, .fx033-evidence").forEach((details) => {
        details.open = false;
      });
    });
  });
  // Reopening the same anchor must work after the reader collapses its panel.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => requestAnimationFrame(revealAnchor));
  });
  // Closing any nested panel pauses its videos, including full-screen playback.
  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("toggle", () => {
      if (!details.open) details.querySelectorAll("video").forEach((video) => video.pause());
    });
  });
  document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("play", () => {
      document.querySelectorAll("video").forEach((other) => {
        if (other !== video) other.pause();
      });
    });
  });
  revealAnchor();
});

window.addEventListener("hashchange", revealAnchor);
