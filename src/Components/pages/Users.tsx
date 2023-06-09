import { useContext } from "react";

import UsersTable from "../tables/UsersTable";

import { AppContext } from "./Layout";
import { User } from "../../utils/generateUsers";
import { isCurrentTab } from "../../utils/isCurrentTab";
import { tabs } from "../../constants";

const Users = () => {
  const users: User[] = useContext(AppContext).users;

  const {currentTab, setCurrentTab} = useContext(AppContext)

  if(!isCurrentTab(currentTab, tabs.USERS)) {
    setCurrentTab(tabs.USERS)
  }

  return (
    <div className="mt-8">
      <UsersTable users={users} isMainDashboardInstance={false} />
    </div>
  );
};

export default Users;
