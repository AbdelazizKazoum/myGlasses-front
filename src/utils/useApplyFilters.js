import { useMemo } from "react";
import { useSelector } from "react-redux";

const useApplyFilters = () => {
  const filters = useSelector((state) => state.filters);
  const { data: productsList } = useSelector((state) => state.products);

  const { searchInput, gender, priceRange, category, rating, priceSort } =
    filters;

  return useMemo(() => {
    try {
      let filteredData = [...(productsList || [])];

      if (priceSort === "LOW_HIGH") {
        filteredData.sort((a, b) => a.newPrice - b.newPrice);
      } else if (priceSort === "HIGH_LOW") {
        filteredData.sort((a, b) => b.newPrice - a.newPrice);
      }

      if (gender !== "All") {
        filteredData = filteredData.filter((item) => item.gender === gender);
      }

      if (searchInput !== "") {
        filteredData = filteredData.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      if (priceRange !== 4999) {
        filteredData = filteredData.filter(
          (item) => item.newPrice <= priceRange
        );
      }

      if (category.length !== 0) {
        filteredData = filteredData.filter((item) =>
          category.includes(item.category)
        );
      }

      if (rating !== "") {
        filteredData = filteredData.filter((item) => item.rating >= rating);
      }

      return filteredData;
    } catch (error) {
      return [];
    }
  }, [
    productsList,
    category,
    priceRange,
    priceSort,
    rating,
    searchInput,
    gender,
  ]); // Only recompute when these dependencies change
};

export default useApplyFilters;
