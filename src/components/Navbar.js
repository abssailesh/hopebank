import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <Link to="/">{t("welcome")}</Link>
      <Link to="/dashboard">{t("dashboard")}</Link>
      <Link to="/login">{t("login")}</Link>
      <Link to="/register">{t("register")}</Link>
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;
