// Prefix the image if its from the backend server
export const getImageUrl = (img) =>
  img.startsWith("http") ? img : `${process.env.REACT_APP_BACKENND_URL}/${img}`;
