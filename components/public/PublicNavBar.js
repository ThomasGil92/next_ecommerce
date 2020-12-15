import { useState, useEffect } from "react";
import Link from "next/link";
import { setCart } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const PublicNavBar = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [searchTerms, setSearchTerms] = useState("");

  useEffect(() => {
    dispatch(setCart());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerms(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-white p-0 m-0">
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
        <form className="form-inline mx-auto d-flex align-items-center">
          <div className="input-group">
            <input
              id="searchInPublicNav"
              type="text"
              style={{
                width: searchTerms && searchTerms !== "" ? "310px" : "400px",
                fontFamily: "FontAwesome",
              }}
              className="form-control rounded-pill d-inline-block"
              placeholder="&#61442;"
              onChange={handleSearch}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
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
                  type="button"
                >
                  Rechercher
                </button>
              </div>
            )}
          </div>
        </form>
        <Link href="/cart" passHref>
          <div className="btn btn-warning pb-2 pt-1 rounded-0 d-flex flex-column align-items-center">
            <div className="d-flex position-relative w-100">
              <i className="fas fa-shopping-cart fa-2x position-absolute"></i>
              <span className="text-white mx-auto" style={{ zIndex: "10" }}>
                {cart.length}
              </span>
            </div>
            <p className="m-0 mt-1">Panier</p>
          </div>
        </Link>
      </div>
    </nav>
  );
};
export default PublicNavBar;
