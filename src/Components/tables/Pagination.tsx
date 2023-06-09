import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { User } from "../../utils/generateUsers";

import { Order } from "./OrdersTable";

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote",
  },
];

interface PaginationProps {
  currentStart: number;
  currentEnd: number;
  totalRowsCount: number;
  pageGroups: User[][] | Order[][];
  setCurrentPage: (currentPage: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { currentStart, currentEnd, totalRowsCount, pageGroups, setCurrentPage } = props;

  const handlePageClick = (index: number) => {
    setCurrentPage(index)
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentStart}</span> to{" "}
            <span className="font-medium">{currentEnd}</span> of{" "}
            <span className="font-medium">{totalRowsCount}</span> results
          </p>
        </div>
        <div className="flex">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm h-12"
            aria-label="Pagination"
          >
            <div
              className=" text-sm w-10 flex justify-center relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {pageGroups.map((_, i) => {
              return (
                <div
                  onClick={() => handlePageClick(i + 1)}
                  key={i + 1}
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex hover:cursor-pointer"
                >
                  {i + 1}
                </div>
              );
            })}
            <div
              className="text-sm w-10 flex justify-center relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
