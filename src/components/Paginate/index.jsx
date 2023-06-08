import { cn } from "@/utils";
import React from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export const Paginate = ({ totalPage = 1 }) => {
  const [search, setSearch] = useSearchParams();
  const { pathname } = useLocation();
  const newsearch = new URLSearchParams(search.toString());
  const currentPage = parseInt(search.get("page") || "1");
  const renderItem = () => {
    let start = currentPage - 2;
    let end = currentPage + 2;
    const list = [];
    if (start < 1) {
      start = 1;
      end = 5;
    }
    if (end > totalPage) {
      end = totalPage;
      start = end - 4;
      if (start < 1) start = 1;
    }

    for (let i = start; i <= end; i++) {
      newsearch.set("page", i);
      const link = pathname + "?" + newsearch.toString();
      list.push(
        <li key={i} className={cn("page-item", { active: currentPage === i })}>
          <Link className="page-link" to={link}>
            {i}
          </Link>
        </li>,
      );
    }
    return list;
  };
  newsearch.set("page", currentPage + 1);
  const nextLink = pathname + "?" + newsearch.toString();
  newsearch.set("page", currentPage - 1);
  const prevLink = pathname + "?" + newsearch.toString();
  if (currentPage > totalPage || totalPage === 1) {
    return null;
  }
  return (
    <nav className="d-flex justify-content-center justify-content-md-end">
      <ul className="pagination pagination-sm text-gray-400">
        {currentPage > 1 && (
          <li className="page-item">
            <Link className="page-link page-link-arrow" to={prevLink}>
              <i className="fa fa-caret-left" />
            </Link>
          </li>
        )}

        {renderItem()}
        {currentPage < totalPage && (
          <li className="page-item">
            <Link className="page-link page-link-arrow" to={nextLink}>
              <i className="fa fa-caret-right" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
