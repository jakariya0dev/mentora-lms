const renderStars = (rating) => {
  const stars = Math.round(rating);
  return "★".repeat(stars) + "☆".repeat(5 - stars);
};

export default renderStars;