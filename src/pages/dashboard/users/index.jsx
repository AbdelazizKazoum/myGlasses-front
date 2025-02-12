import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../../store/productsSlice";
import UserTable from "../../../components/dashboard/users/UsersTables";

function UsersPage() {
  const { data } = useSelector((state) => state.products);
  console.log("🚀 ~ ProductsPage ~ data:", data);

  // Hooks
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getProducts());
    })();
  }, [dispatch]);

  return (
    <div className=" h-full  ">
      <UserTable data={data} />
    </div>
  );
}

export default UsersPage;
