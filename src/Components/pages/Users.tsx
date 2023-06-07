import { useContext } from "react";

import UsersTable from "../../Components/UsersTable";

import { AppContext } from "./Layout";
import { User } from "../../utils/generateUsers";

const Users = () => {
  const users: User[] = useContext(AppContext).users;

  return (
    <div className="mt-8">
      <UsersTable users={users} isMainDashboardInstance={false} />
    </div>
  );
};

export default Users;
