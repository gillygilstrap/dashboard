import React, { useState, useEffect } from "react";

import { User } from "../../utils/generateUsers";
import UserCard from "../UserCard";
import Pagination from "./Pagination";

interface UsersTableProps {
  users: User[];
  isMainDashboardInstance: boolean;
}
const UsersTable: React.FC<UsersTableProps> = (props: UsersTableProps) => {
  const { users, isMainDashboardInstance } = props;
  const usersPerPage: number = 15;

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(
    users.slice(0, usersPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStart, setCurrentStart] = useState(1);
  const [currentEnd, setCurrentEnd] = useState(usersPerPage);

  useEffect(() => {
    setCurrentGroup(pageGroups[currentPage - 1]);

    // last page
    if (currentPage === pageGroups.length) {
      setCurrentEnd(users.length);
    } else {
      // All other pages
      setCurrentEnd(currentPage * usersPerPage);
    }
    // Un needed warnings are thrown by the line below
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    // Last page
    if (currentPage === pageGroups.length) {
      setCurrentStart(currentEnd - (currentGroup.length - 1));
    } else {
      // All other pages
      setCurrentStart(currentEnd - (usersPerPage - 1));
    }

    // Un needed warnings are thrown by the line below
    // eslint-disable-next-line
  }, [currentEnd]);

  const pageGroups: User[][] = [];

  const numberOfPages = Math.floor(users.length / usersPerPage) + 1;

  for (let i = 0; i < numberOfPages; i++) {
    const startingPoint = i * usersPerPage;
    const userGroup = users.slice(startingPoint, startingPoint + usersPerPage);
    // const page = i + 1;
    pageGroups.push(userGroup);
  }

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleOpen = (isOpenFromChild: boolean) => {
    setIsOpen(isOpenFromChild);
  };
  return (
    <div
      className={`users-table w-full pb-6 bg-white rounded-md shadow-md flex flex-col text-center text-6xl ${
        isMainDashboardInstance ? "hover:cursor-pointer hover:scale-1002" : ""
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="-mx-4 mt-6 sm:-mx-0">
          <div className="text-4xl md:text-6xl md:text-left tracking wide text-slate-700 mb-6 tracking-wider text-center">
            Users Table
          </div>
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-slate-700 sm:pl-0"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-center text-sm font-semibold text-slate-700 sm:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-center text-sm font-semibold text-slate-700 sm:table-cell"
                >
                  DOB
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-center text-sm font-semibold text-slate-700 lg:table-cell"
                >
                  Age
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-center text-sm font-semibold text-slate-700"
                >
                  Country
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentGroup.map((user) => (
                <tr
                  key={user.email}
                  className={`${
                    !isMainDashboardInstance
                      ? "hover:cursor-pointer hover:bg-slate-100"
                      : ""
                  }`}
                  onClick={() => handleUserClick(user)}
                >
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-slate-700 sm:w-auto sm:max-w-none sm:pl-0">
                    {`${user.firstName} ${user.lastName}`}
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only sm:hidden">Email</dt>
                      <dd className="mt-1 truncate text-gray-500 sm:hidden">
                        {user.username}
                      </dd>
                    </dl>
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {user.email}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {user.dob}
                  </td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {user.age}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {user.location.country}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentStart={currentStart}
        currentEnd={currentEnd}
        totalRowsCount={users.length}
        pageGroups={pageGroups}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <UserCard user={selectedUser} isOpen={isOpen} setIsOpen={handleOpen} />
    </div>
  );
};

export default UsersTable;
