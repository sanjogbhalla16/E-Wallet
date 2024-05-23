import React, { useEffect, useState } from "react";
import { AppBar } from "../components/AppBarComp";
import { Balance } from "../components/BalanceComp";
import { Users, User } from "../components/UserComp";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([{}]);

  //now we need to fetch these values whenever someone will type users in the app bar
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/").then((response) => {
      setUsers(response.data.user);
    });
  }, [users]);
  return (
    <div>
      <AppBar></AppBar>
      <div>
        <Balance></Balance>
        <Users />
        <div>
          {users.map((user) => (
            <User user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
