import Link from "next/link";
import { useEffect, useState } from "react";
import { withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin, setAdmin } from "../../redux/actions";

const Navbar = ({ router }) => {
  const isAuth = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAdmin());
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    if (process.browser) {
      if (sessionStorage.getItem("master") || sessionStorage.getItem("admin")) {
        sessionStorage.clear();
        dispatch(clearAdmin());
        router.push("/login-admin");
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{zIndex:"10000000"}}>
      <Link href="/admin-dashboard" passHref>
        <div className="navbar-brand" style={{cursor:"pointer"}}>logo du site</div>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isAuth && isAuth.admin && isAuth.admin.role === 2 ? (
          <Link href="/super-admin/new-admin">
            <a className="btn btn-outline-primary">Ajouter un admin</a>
          </Link>
        ) : (
          ""
        )}
        <ul className="navbar-nav ml-auto">
          <li title="Voir le site" className="nav-item mr-2 d-flex align-items-center">
            <Link href={"/"}>
              <a target="_blank" className="btn btn-link text-white">
                <i className="far fa-eye fa-2x"></i>
              </a>
            </Link>
          </li>
          {isAuth && isAuth.token && (
            <>
              <li className="nav-item dropdown mr-2">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user fa-2x text-white"></i>
                </a>
                <div
                  className="dropdown-menu  dropdown-menu-right text-dark"
                  aria-labelledby="navbarDropdown"
                >
                  <Link href={`/admin/${isAuth.admin._id}`}>
                    <a className="dropdown-item">Votre profil</a>
                  </Link>
{isAuth.admin.role===1 && (
  <Link href={`/super-admin/new-admin`}>
  <a className="dropdown-item">Ajouter un administrateur</a>
</Link>
)}
                  
                </div>
              </li>
              <li className="nav-item d-flex align-items-center">
                <button
                  title="Se déconnecter"
                  className="btn btn-link text-danger"
                  onClick={logout}
                >
                  <i className="fas fa-power-off fa-2x"></i>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default withRouter(Navbar);
