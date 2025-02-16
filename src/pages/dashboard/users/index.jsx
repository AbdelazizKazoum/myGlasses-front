import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserTable from "../../../components/dashboard/users/UsersTables";
import Loader from "../../../components/Loader";
import { fetchAllUsers } from "../../../store/usersSlice";

function UsersPage() {
  // Hooks
  const { users, status } = useSelector((state) => state.users);

  // Hooks
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllUsers());
    })();
  }, [dispatch]);

  if (status === "PENDING") return <Loader />;

  return (
    <div className=" h-full  ">
      <UserTable users={users} />
    </div>
  );
}

export default UsersPage;
