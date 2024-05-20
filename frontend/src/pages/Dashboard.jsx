import React, { useEffect, useState } from "react";
import { AppBar } from "../components/AppBarComp";
import { Balance } from "../components/BalanceComp";
import { Users, User } from "../components/UserComp";

function Dashboard() {
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
