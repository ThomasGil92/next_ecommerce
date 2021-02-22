import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCart, setUser, clearUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import {ThemeButton} from '../uiComponent/ThemeButton'

const PublicNavBar = ({ products }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userAuth = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    dispatch(setUser());
    dispatch(setCart());
  }, []);

  const handleSearch = (e) => {
    setSearchTerms(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerms !== "") {
      router.push(`/search/${searchTerms}`);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    if (process.browser) {
      if (sessionStorage.getItem("user")) {
        sessionStorage.clear();
        dispatch(clearUser());
        if (localStorage.getItem("session")){
          localStorage.removeItem("session")
        }
        router.reload();
      }
    }
  };

  return (
    <>
      <nav className={theme==="dark"?"navbar navbar-expand-lg fixed-top navbar-dark bg-dark border-bottom border-secondary p-0 m-0":"navbar navbar-expand-lg fixed-top navbar-light bg-white p-0 m-0"}>
        <Link href={"/"}>
          <a className="navbar-brand">Logo</a>
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
          <form
            onSubmit={handleSubmit}
            className="form-inline mx-auto d-flex align-items-center"
          >
            {process.browser && (
               window.innerWidth > 768 ? (
              <div className="input-group">
                <input
                  id="searchInPublicNav"
                  type="text"
                  style={{
                    width:
                      searchTerms && searchTerms !== "" ? "310px" : "400px",
                    fontFamily: "FontAwesome",
                  }}
                  className={theme==="dark"?"form-control bg-dark text-white rounded-pill d-inline-block border-secondary":"form-control rounded-pill d-inline-block"}
                  placeholder="&#61442;"
                  onChange={handleSearch}
                  autoComplete="off"
                />
                {searchTerms && searchTerms !== "" && (
                  <div
                    className="input-group-append"
                    style={{
                      minWidth: "125px",
                      marginLeft: "-35px",
                      zIndex: "5",
                    }}
                  >
                    <button
                      className={theme==="dark"?"btn btn-dark rounded-pill border border-warning w-100 py-1":"btn btn-dark rounded-pill w-100 py-1"}
                      type="submit"
                    >
                      Rechercher
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="input-group">
                <input
                  id="searchInPublicNav"
                  type="text"
                  maxlength="21"
                  style={{
                    width:
                      searchTerms && searchTerms !== "" ? "60%" : "100%",
                    fontFamily: "FontAwesome",
                  }}
                  className="form-control rounded-pill d-inline-block"
                  placeholder="&#61442;"
                  onChange={handleSearch}
                  autoComplete="off"
                />
                {searchTerms && searchTerms !== "" && (
                  <div
                    className="input-group-append"
                    style={{
                      minWidth: "125px",
                      marginLeft: "-35px",
                      zIndex: "5",
                    }}
                  >
                    <button
                      className="btn btn-dark rounded-pill w-100 py-1"
                      type="submit"
                    >
                      Rechercher
                    </button>
                  </div>
                )}
              </div>
            )
            )}
            
          </form>
          <div className="d-flex align-items-center">
            <ThemeButton/>
            {userAuth && !userAuth.token ? (
              <Link href="/user/login" passHref>
                <div
                  title="Me connecter"
                  className="btn btn-white px-4 rounded-0 d-flex align-items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    className={theme==="dark"?"bi bi-person text-white":"bi bi-person"}
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                    />
                  </svg>
                </div>
              </Link>
            ) : (
              <>
                <ul className="navbar-nav ml-md-auto">
                  <li className="nav-item dropdown mr-2">
                    <a
                      className={theme==="dark"?"nav-link dropdown-toggle text-white":"nav-link dropdown-toggle text-dark"}
                      role="button"
                      data-toggle="dropdown"
                      id="navbarDropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user fa-2x"></i>
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-bottom dropdown-menu-md-right"
                      aria-labelledby="navbarDropdown"
                    >

                      
                      <Link
                        href={`/user/profile/${userAuth.user._id}`}
                        passHref
                      >
                        <a className="dropdown-item">Mon compte</a>
                      </Link>

                      <button
                        title="Se déconnecter"
                        className="btn btn-link text-danger dropdown-item"
                        onClick={logout}
                      >
                        Déconnection
                        <i className="fas fa-power-off"></i>
                      </button>
                    </div>
                  </li>
                </ul>
              </>
            )}

            <Link href="/cart" passHref>
              <div className="btn btn-warning pb-2 pt-1 rounded-0 d-flex flex-column align-items-center">
                <div className="d-flex position-relative w-100">
                  <i className="fas fa-shopping-cart fa-2x position-absolute"></i>

                  {cart && cart.length ? (
                    <span
                      className="text-white mx-auto"
                      style={{ zIndex: "10" }}
                    >
                      {cart.length}
                    </span>
                  ) : (
                    <span
                      className="text-white mx-auto"
                      style={{
                        zIndex: "10",
                        minHeight: "24px",
                        minWidth: "3px",
                      }}
                    ></span>
                  )}
                </div>
                <p className="m-0 mt-1">Panier</p>
              </div>
            </Link>
          </div>
        </div>
      </nav>
      <ToastContainer transition={Zoom} />
    </>
  );
};
export default PublicNavBar;
