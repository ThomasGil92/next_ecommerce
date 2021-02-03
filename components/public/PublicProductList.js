import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/actions";

const PublicProductList = ({ products }) => {
  const dispatch = useDispatch();
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
  useEffect(() => {
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
  }, []);

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

  return (
    <div className="mt-5 mx-0 text-center bg-third pb-5">
      <h2>Tous nos produits</h2>
      <div className="container-fluid">
        <div className="row mx-0 mt-4">
          {products &&
            products.map((product, i) => {
              return (
                <div key={i} className="col-md-3">
                  <div
                    className="card mx-auto my-3"
                    style={{
                      maxWidth: "290px",
                      borderRadius: "15px",
                      height: "417px",
                    }}
                  >
                    <img
                    loading="lazy"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      data-whatever={JSON.stringify(product)}
                      data-src={product.imageUrl}
                      className="card-img-top lazyload"
                      alt={product.productName}
                      style={{
                        cursor: "pointer",
                        borderTopRightRadius: "15px",
                        borderTopLeftRadius: "15px",
                      }}
                    />
                    <div className="card-body text-left p-2 d-flex flex-column justify-content-between">
                      <h5
                        data-toggle="modal"
                        data-target="#exampleModal"
                        data-whatever={JSON.stringify(product)}
                        className="card-title py-3"
                        style={{ lineHeight: "0.8", cursor: "pointer" }}
                      >
                        {product.productName.charAt(0).toUpperCase() +
                          product.productName.slice(1)}
                      </h5>
                      <div className="row m-0 ">
                        <div className="col-md-6 px-0 d-flex align-items-center">
                          {product.price} €
                        </div>
                        <div className="col-md-6 px-0">
                          <motion.button
                            onClick={addToCart(product)}
                            initial={{
                              backgroundColor: "#e5e5e5",
                              color: "black",
                              border: "none",
                            }}
                            whileHover={{
                              backgroundColor: "#FFC107",
                              color: "red",
                              border: "none",
                            }}
                            transition={{ delay: 0, duration: 0 }}
                            className="btn d-flex align-items-center text-left py-1"
                            style={{ lineHeight: "0.8" }}
                          >
                            <i className="fas fa-cart-plus mr-2"></i>
                            <span>Ajouter au panier</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* Modal */}
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
                <img /* className="lazyload" */ src={imageUrl} />
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
                  onClick={addToCart(selectedProduct)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProductList;
