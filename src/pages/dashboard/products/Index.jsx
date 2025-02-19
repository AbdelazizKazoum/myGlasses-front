import { useDispatch, useSelector } from "react-redux";
import List from "../../../components/dashboard/products/ProductTable";
import { useEffect } from "react";
import { getProducts } from "../../../store/productsSlice";

function ProductsPage() {
  const { data } = useSelector((state) => state.products);

  // Hooks
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getProducts());
    })();
  }, [dispatch]);

  return (
    <div className=" h-full  ">
      <List data={data} />
    </div>
  );
}

export default ProductsPage;
