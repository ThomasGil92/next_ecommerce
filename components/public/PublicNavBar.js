import { useState } from "react";

const PublicNavBar = () => {
  const [searchTerms, setSearchTerms] = useState("");

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchTerms(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white p-0 m-0">
      <a className="navbar-brand" href="#">
        Logo
      </a>
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
              className="form-control rounded-pill  my-2 d-inline-block"
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
                  marginLeft: "-35px", zIndex: "5",
                }}
              >
                <button className="btn btn-dark rounded-pill w-100" type="button">
                  Rechercher
                </button>
              </div>
            )}
          </div>
        </form>
          <button className="btn btn-warning pb-2 pt-1 rounded-0 d-flex flex-column align-items-center"><i className="fas fa-shopping-cart"></i>Panier</button>
      </div>
    </nav>
  );
};
export default PublicNavBar;
