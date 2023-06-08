import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages";
import { Page404 } from "@/pages/404";
import Account from "@/pages/profile";
import { Auth } from "@/pages/auth";
import { Shop } from "@/pages/shop";
import Profile from "@/pages/profile";
import { PrivateRoute } from "@/components/PrivateRoute";
import ProfileLayout from "@/layouts/ProfileLayout";
import Profile_order from "../pages/profile/order";
import Profile_wishlist from "../pages/profile/wishlist";
import Profile_Addresses from "../pages/profile/addresses";
import Profile_Payment from "../pages/profile/payment";

export const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },

      {
        path: "*",
        element: <Page404 />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },

      {
        element: <PrivateRoute redirect="/auth" />,
        children: [
          {
            element: <ProfileLayout />,
            path: "/profile",
            children: [
              {
                element: <Profile />,
                index: true,
              },
              {
                element: <Profile_order />,
                path: "/profile/order",
              },
              {
                element: <Profile_wishlist />,
                path: "/profile/wishlist",
              },
              {
                element: <Profile_Addresses />,
                path: "/profile/addresses",
              },
              {
                element: <Profile_Payment />,
                path: "/profile/payment",
              },
            ],
          },
        ],
      },
    ],
  },
];
