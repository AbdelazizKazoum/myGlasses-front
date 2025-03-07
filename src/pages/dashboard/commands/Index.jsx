import React, { useEffect, useState } from "react";
import CommandsTable from "../../../components/dashboard/commands/CommandsTables";
import { useDispatch, useSelector } from "react-redux";
import { getCommandes } from "../../../store/commandeSlice";
import Loader from "../../../components/Loader";

const CommandsPage = () => {
  const { commands } = useSelector((state) => state.commande);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    (async () => {
      await dispatch(getCommandes());
      setLoading(false);
    })();
  }, [dispatch]);

  return (
    <div className=" h-full  ">
      {loading ? <Loader /> : <CommandsTable commands={commands} />}
    </div>
  );
};

export default CommandsPage;
