import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { User } from "../utils/generateUsers";
const xMarkIcon = <FontAwesomeIcon icon={faXmark} />;

interface UserCardProps {
  user: User | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserCard = (props: UserCardProps) => {
  const { user, isOpen, setIsOpen } = props;
  //   console.log(`Inside of the User Card`, user);

  return (
    <div>
      {user ? (
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(!isOpen)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pb-4 px-3 pt-1 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl text-slate-800">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <img
                          className="rounded-full mt-3 ml-2"
                          src={user.picture.large}
                          alt="User"
                        />
                      </div>
                      <div className="w-full ml-6 flex flex-col hidden sm:block">
                        <span className=" tracking-wider text-3xl text-left font-bold pt-2">{`${user.firstName} ${user.lastName}`}</span>
                        <div className="flex mt-2 tracking-wider">
                          <div className=" text-lg font-bold my-auto tracking-wider">
                            Username:
                          </div>
                          <div className="my-auto pl-2">{user.username}</div>
                        </div>
                        <div className="flex mt-1 tracking-wider">
                          <div className=" text-lg font-bold my-auto tracking-wider">
                            Country:
                          </div>
                          <div className="my-auto pl-2">
                            {user.location.country}
                          </div>
                        </div>
                      </div>
                      <div
                        className="text-right hover:cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {xMarkIcon}
                      </div>
                    </div>

                    <div className="container px-2 mt-2 flex flex-col tracking-wider">
                      <div className="w-full flex flex-col sm:hidden">
                        <span className=" tracking-wider text-2xl text-left font-bold pt-2">{`${user.firstName} ${user.lastName}`}</span>
                        <div className="flex mt-2 tracking-wider">
                          <div className="text-base sm:text-lg font-bold my-auto tracking-wider">
                            Username:
                          </div>
                          <div className="my-auto pl-2">{user.username}</div>
                        </div>
                        <div className="flex mt-1 tracking-wider">
                          <div className="text-base sm:text-lg font-bold my-auto tracking-wider">
                            Country:
                          </div>
                          <div className="my-auto pl-2">
                            {user.location.country}
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-1">
                        <div className="text-base sm:text-lg font-bold my-auto">
                          Date Of Birth:
                        </div>
                        <div className="my-auto pl-2">{user.dob}</div>
                      </div>

                      <div className="flex mt-1">
                        <div className="text-base sm:text-lg font-bold my-auto">Age:</div>
                        <div className="my-auto pl-2">{user.age}</div>
                      </div>

                      <div className="flex mt-1">
                        <div className="text-base sm:text-lg font-bold my-auto">
                          Gender:
                        </div>

                        <div className="my-auto pl-2">{user.gender}</div>
                      </div>

                      <div className="flex mt-1">
                        <div className=" sm:hidden text-base sm:text-lg font-bold my-auto">
                          Email:
                        </div>
                        <div className="hidden sm:block text-base sm:text-lg font-bold my-auto">
                          Email Address:
                        </div>
                        <div className="my-auto pl-2">{user.email}</div>
                      </div>

                      <div className="flex mt-1">
                        <div className=" text-base sm:text-lg font-bold my-auto">
                          Registered:
                        </div>
                        <div className="my-auto pl-2">
                          {user.registeredDate}
                        </div>
                      </div>

                      <div className="flex mt-1">
                        <div className="text-base sm:text-lg font-bold ">Address:</div>
                        <div className="flex flex-col">
                          <div className="pl-2 pt-0.5">{`${user.location.houseNumber} ${user.location.street}`}</div>
                          <div className="pl-2">{`${user.location.state}, ${user.location.country} ${user.location.zipcode}`}</div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserCard;
