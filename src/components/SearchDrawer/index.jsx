import { Drawer } from "antd";
import React, { useState } from "react";
import { useQuery } from "../../hooks/useQuery";
import { productService } from "../../services/product";
import { currency } from "../../utils/currency";
import { useDebounce } from "../../hooks/useDebounce";
import qs from "query-string";
import { useFetch } from "@/hooks/useFetch";
import { Link } from "react-router-dom";
import { PATH } from "../../config/path";

export default function SearchDrawer({ open, onClose }) {
  const [value, setValue] = useDebounce("");
  const [categoryId, setCategory] = useState("");

  const searchParam = new URLSearchParams();
  searchParam.set("limit", 6);
  if (value) {
    searchParam.set("name", value);
  }
  if (categoryId) {
    searchParam.set("categories", categoryId);
  }
  const queryString = searchParam.toString();
  const { data: products = [] } = useFetch(
    () => productService.getProduct(`${queryString}`),
    [queryString],
  );

  const { data: { data: categories = [] } = {} } = useQuery({
    queryFn: () => productService.getCategories(`${categories}`),
    queryKey: "categories",
    storeDriver: "redux",
    enabled: open,
  });
  const _queryString = qs.stringify({
    categories: categoryId || undefined,
    search: value || undefined,
  });
  const reviewLink = PATH.shop + "?" + _queryString;

  return (
    <Drawer
      open={open}
      onClose={onClose}
      headerStyle={{ display: "none" }}
      bodyStyle={{ padding: 0 }}
      width={470}>
      <div className="">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="close"
          data-dismiss="modal"
          aria-label="Close">
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Search Products</strong>
        </div>
        {/* Body: Form */}
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label className="sr-only" htmlFor="modalSearchCategories">
                Categories:
              </label>
              <select
                className="custom-select"
                id="modalSearchCategories"
                onChange={(ev) => {
                  setCategory(ev.target.value);
                }}>
                <option value={0}>All Categoreis</option>
                {categories.map((e) => (
                  <option value={e.id} key={e.id} {...e}>
                    {e.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group input-group-merge">
              <input
                defaultValue={value}
                onChange={(e) => setValue(e.target.value.trim())}
                className="form-control"
                type="search"
                placeholder="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-border" type="submit">
                  <i className="fe fe-search" />
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* Body: Results (add `.d-none` to disable it) */}
        <div className="modal-body border-top font-size-sm">
          {/* Heading */}
          <p>Search Results:</p>
          {/* Items */}

          {products.map((e) => (
            <SearchItem key={e.id} {...e} />
          ))}
          {/* Button */}
          <Link onClick={onClose} className="btn btn-link px-0 text-reset" to={reviewLink}>
            View All <i className="fe fe-arrow-right ml-2" />
          </Link>
        </div>
        {/* Body: Empty (remove `.d-none` to disable it) */}
        <div className="d-none modal-body">
          {/* Text */}
          <p className="mb-3 font-size-sm text-center">Nothing matches your search</p>
          <p className="mb-0 font-size-sm text-center">😞</p>
        </div>
      </div>
    </Drawer>
  );
}

const SearchItem = ({ images, name, price }) => {
  return (
    <>
      <div className="row align-items-center position-relative mb-5">
        <div className="col-4 col-md-3">
          {/* Image */}
          <img className="img-fluid" src={images[0].thumbnail_url} alt="..." />
        </div>
        <div className="col position-static">
          {/* Text */}
          <p className="mb-0 font-weight-bold">
            <a className="stretched-link text-body" href="./product.html">
              {name}
            </a>
            <br />
            <span className="text-muted">{currency(price)} VND</span>
          </p>
        </div>
      </div>
    </>
  );
};
