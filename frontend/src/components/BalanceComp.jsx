import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance")
      .then((response) => {
        setBalance(response.data.balance);
      });
  });

  return (
    <div className="flex">
      <div className="font-bold text-lg">Maximum balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {balance}</div>
    </div>
  );
};
