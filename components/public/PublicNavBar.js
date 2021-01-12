import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { setCart, setUser, clearUser } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast,Zoom } from "react-toastify";

const PublicNavBar = ({ products }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userAuth = useSelector((state) => state.user);
  const [searchTerms, setSearchTerms] = useState("");
  const [filteredProducts, setFilteredProducts] = useState();
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    price: "",
    description: "",
    productName: "",
    stock: "",
    imageUrl: "",
    quantityInCart: 0,
  });
  const {
    productName,
    imageUrl,
    stock,
    description,
    price,
    _id,
    quantityInCart,
  } = selectedProduct;

  const notify = () => toast.success("Produit ajouté au panier");

  useEffect(() => {
    dispatch(setUser());
    dispatch(setCart());
    $("#exampleModal").on("show.bs.modal", function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var recipient = button.data("whatever");
      setSelectedProduct({
        _id: recipient._id,
        productName: recipient.productName,
        stock: recipient.stock,
        price: recipient.price,
        imageUrl: recipient.imageUrl,
        description: recipient.description,
        quantityInCart: recipient.quantityInCart,
      });
    });
  }, [dispatch]);

  const addToCart = (productToAdd) => (e) => {
    productToAdd.quantityInCart++;
    e.preventDefault;
    var cart = [];

    if (!localStorage.getItem("cart")) {
      productToAdd.quantityInCart = 1;
      cart.push(productToAdd);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const allProductInCart = localStorage.getItem("cart");
      const found = JSON.parse(allProductInCart).find(
        (e) => e._id === productToAdd._id,
      );
      if (found) {
        found.quantityInCart += 1;
        cart.push(found);
        JSON.parse(allProductInCart).forEach((p) => {
          if (p._id !== found._id) {
            cart.push(p);
          }
        });
      } else {
        productToAdd.quantityInCart = 1;
        cart.push(productToAdd);
        JSON.parse(allProductInCart).forEach((p) => {
          cart.push(p);
        });
      }

      //cart.push(p);
      console.log(cart);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    dispatch(setCart());
  };

  const handleSearch = (e) => {
    setSearchTerms(e.target.value);
    if (products) {
      const filtered = products.products.filter((product) => {
        return product.productName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      console.log(filtered);
      setFilteredProducts({ filtered });
    }
  };

  const logout = (e) => {
    e.preventDefault();
    if (process.browser) {
      if (sessionStorage.getItem("user")) {
        sessionStorage.clear();
        dispatch(clearUser());
        router.reload();
      }
    }
  };

  return (
    <>
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
                autoComplete="off"
                /*  onBlur={(e) => {
                  setFilteredProducts();
                }} */
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
          <div className="d-flex">
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
                    className="bi bi-person"
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
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown mr-2 d-flex align-items-center">
                    <a
                      className="nav-link dropdown-toggle text-dark"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user fa-2x text-dark"></i>
                    </a>
                    <div
                      className="dropdown-menu  dropdown-menu-right"
                      aria-labelledby="navbarDropdown"
                    >
                      {/* <Link href={`/admin/${isAuth.admin._id}`}>
                    <a className="dropdown-item">Votre profil</a>
                  </Link> */}

                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
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
      <div className="fixed-top mt-5 pt-3">
        {filteredProducts &&
          filteredProducts.filtered.map((product, i) => {
            return (
              <div
                key={i}
                className="col-7 mx-auto bg-white d-flex align-items-center"
                data-toggle="modal"
                data-target="#exampleModal"
                data-whatever={JSON.stringify(product)}
                onClick={(e) => setFilteredProducts()}
                style={{ maxHeight: "100px", height: "100px" }}
              >
                <div className="col-3">
                  <img src={product.imageUrl} height="80px" />
                </div>
                <div className="col-6">
                  <strong className="text-uppercase">
                    {product.productName}
                  </strong>
                  <br />
                  {product.description}
                </div>
                <div className="col-3 text-right" style={{ fontSize: "20px" }}>
                  {product.price} &euro;
                </div>
              </div>
            );
          })}
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close mx-0 mr-auto"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&#x3c;</span>
              </button>
              <div>
                {stock > 0 ? (
                  <div className="text-success">&#x2713; En stock</div>
                ) : (
                  <div className="text-danger">&#9888; Rupture de stock</div>
                )}
              </div>
            </div>
            <div className="modal-body text-left">
              <img src={imageUrl} />
              <div className="text-left mt-4">
                <h4>
                  {productName.charAt(0).toUpperCase() + productName.slice(1)}
                </h4>
                <p className="mt-4">{description}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Retour
              </button>
              <button
                type="submit"
                form="updateProductForm"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(e) => {
                  e.preventDefault()
                  addToCart(selectedProduct);
                  notify()
                }}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </>
  );
};
export default PublicNavBar;
