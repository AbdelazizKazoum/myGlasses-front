export const scrollDown = () => {
  // Scroll to the bottom after submission
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, 300); // Delay to ensure the UI updates
};
