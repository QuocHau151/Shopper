import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProfileLayout() {
  const { user, logout } = useAuth();

  return (
    <section className="pt-7 pb-12">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10">My Account</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-10 mb-md-0">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle  "
                  to={"/profile/order"}>
                  Orders
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={"/profile/wishlist"}>
                  Wishlist
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  end
                  to={"/profile"}>
                  Personal Info
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={"/profile/addresses"}>
                  Addresses
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={"/profile/payment"}>
                  Payment Methods
                </NavLink>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  className="list-group-item list-group-item-action dropright-toggle"
                  href="#!">
                  Logout
                </a>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
