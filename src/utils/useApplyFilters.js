import { useSelector } from "react-redux";
import axios from 'axios';

const useApplyFilters =  () => {
  const filters = useSelector((state) => state.filters);

  // get products
  const {data :productsList } = useSelector((state) => state.products);


  
  const { searchInput, gender, priceRange, category, rating, priceSort } =
    filters;



    
  try {
    let filteredData=[];






 // let filteredData = [...productsList];

  if (priceSort === "LOW_HIGH") {
    filteredData.sort((a, b) => a.newPrice - b.newPrice);
  } else if (priceSort === "HIGH_LOW") {
    filteredData.sort((a, b) => b.newPrice - a.newPrice);
  } else {
    filteredData = [...productsList];
  }

  filteredData =
    gender !== "All"
      ? filteredData.filter((item) => item.gender === gender)
      : filteredData;

  filteredData =
    searchInput !== ""
      ? filteredData.filter((item) =>
          item.name.toLowerCase().includes(searchInput.toLowerCase())
        )
      : filteredData;

  filteredData =
    priceRange !== 4999
      ? filteredData.filter((item) => item.newPrice <= priceRange)
      : filteredData;

  filteredData =
    category.length !== 0
      ? filteredData.filter((item) => category.includes(item.category))
      : filteredData;

  filteredData =
    rating !== ""
      ? filteredData.filter((item) => item.rating >= rating)
      : filteredData;

  return filteredData;
} catch (error) {
  console.error('Error fetching products:', error);
  return [];
}
};

export default useApplyFilters;
