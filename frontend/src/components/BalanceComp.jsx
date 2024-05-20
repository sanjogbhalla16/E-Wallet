import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = ({ value }) => {
  const [balance, setBalance] = useState("0");

  //help use to sync component with external system
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/account/balance").then((result) => {
      setBalance(result.data.balance);
    });
  });
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
    </div>
  );
};
