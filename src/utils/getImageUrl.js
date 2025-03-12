export const getImageUrl = (img) => {
  if (!img) return "";
  const normalizedPath = img.replace(/\\/g, "/"); // Replace all backslashes
  return normalizedPath.startsWith("http")
    ? normalizedPath
    : `${process.env.REACT_APP_BACKENND_URL}/${normalizedPath}`;
};
