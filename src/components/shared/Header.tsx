import logoWeb from "@/assets/LogoWeb.png";
import { useUserContext } from "@/contexts/UserContext";
import { GetProfile } from "@/lib/api/profile-api";
import { Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  href: string;
  label: string;
}
const navItemCustomer: NavItem[] = [
  { href: "home", label: "Trang chủ" },
  { href: "profile", label: "Hồ Sơ" },
  { href: "booking", label: "Đơn đặt" },
  { href: "tour", label: "Tour" },
];
const navItemTourOwner: NavItem[] = [
  { href: "home", label: "Trang chủ" },
  { href: "profile", label: "Hồ Sơ" },
  { href: "tourowner", label: "Quản lý tour" },
];
const navItemAdmin: NavItem[] = [
  { href: "home", label: "Trang chủ" },
  { href: "profile", label: "Hồ Sơ" },
  { href: "statisticuser", label: "Thống kê Customer" },
  { href: "statistictourowner", label: "Thống kê TourOwner" },
];
export default function Header() {
  const [user, setUser] = useUserContext();
  const [routeDisplay, setRouteDisplay] = useState<NavItem[]>();
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const handleLogout = () => {
    setUser(null)
    setRouteDisplay(undefined);
  }
  useEffect(() => {
    const fetchDataUser = () => {
      GetProfile()
        .then((res) => {
          if (!res.succeeded) {
            console.log(res.messages[0]);
          }
          if (res.data != null) {
            setAvatarUrl(res.data.avatar)

          }
        })
    }
    fetchDataUser()
  }, [])
  useEffect(() => {
    if (user != null) {
      if (user.role == "Customer") {
        setRouteDisplay(navItemCustomer)
      }
      if (user.role == "Tour owner") {
        setRouteDisplay(navItemTourOwner)
      }
      if (user.role == "superadmin") {
        setRouteDisplay(navItemAdmin)
      }
    }
  }, [user])
  return (
    <div className="header_app">
      <div className="header__logo">
        <img src={logoWeb} alt="Logo Web" />
      </div>
      <ul className="header__nav-list">
        {routeDisplay?.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.href}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "header__nav-item"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="header__login">
        {user ? (
          <>
            <Button className="header__login-signin" onClick={handleLogout}>
              Đăng xuất
            </Button>
            <Avatar src={avatarUrl} size="large" alt="avatar_user" />
          </>
        ) : (
          <NavLink className="header__login-signin" to="/signin">
            Đăng nhập
          </NavLink>
        )}
        {/* <div className="header__login-separator"></div>
        <NavLink className="header__login-signup" to="/signup">
          Đăng ký
        </NavLink> */}
      </div>
    </div>
  );
}
