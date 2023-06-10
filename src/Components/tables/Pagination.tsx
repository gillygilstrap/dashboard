import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { User } from "../../utils/generateUsers";

import { Order } from "./OrdersTable";

interface PaginationProps {
  currentStart: number;
  currentEnd: number;
  totalRowsCount: number;
  pageGroups: User[][] | Order[][];
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const {
    currentStart,
    currentEnd,
    totalRowsCount,
    pageGroups,
    currentPage,
    setCurrentPage,
  } = props;

  const handlePageClick = (index: number) => {
    setCurrentPage(index);
  };

  const handleBackClick = () => {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  const handleForwardClick = () => {
    if (currentPage === pageGroups.length) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <div
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handleBackClick()}
        >
          Previous
        </div>
        <div
          className="relative disabled ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={() => handleForwardClick()}
        >
          Next
        </div>
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
              onClick={() => handleBackClick()}
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
                  className={`relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0 md:inline-flex hover:cursor-pointer ${currentPage === i + 1 ? 'bg-gray-200 ' : 'hover:bg-gray-50'}`}
                >
                  {i + 1}
                </div>
              );
            })}
            <div
              className="text-sm w-10 flex justify-center relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:cursor-pointer"
              onClick={() => handleForwardClick()}
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
