import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className={
        theme === "dark"
          ? "fixed-bottom border-top border-secondary"
          : "fixed-bottom"
      }
    >
      <ul className="nav bg-dark text-white justify-content-center">
        <Link passHref href="/" className="nav-item">
          <a
            className={
              router.route === "/"
                ? "nav-link border-top border-warning text-warning"
                : "nav-link"
            }
          >
            Accueil
          </a>
        </Link>
        <Link href="mentions-legales" passHref className="nav-item">
          <a
            className={
              router.route === "/mentions-legales"
                ? "nav-link border-top border-warning text-warning"
                : "nav-link"
            }
          >
            Mentions Légales
          </a>
        </Link>
      </ul>
    </div>
  );
};
export default Footer;
