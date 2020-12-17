import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/actions";

const CartRecap = () => {
  
  const dispatch = useDispatch();
  const [allProductInCart, setAllProductInCart] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    var cart = JSON.parse(localStorage.getItem("cart"));
    console.log(cart);
    setAllProductInCart(cart);
    var t = 0;
    cart.map((p) => {
      const totalOfP = p.price * p.quantityInCart;
      t += totalOfP;
    });
    setTotalPrice(Number.parseFloat(t).toFixed(2));
  }, []);

  const total = (product) => {
    var t = product.price * product.quantityInCart;
    return Number.parseFloat(t).toFixed(2);
  };

  const totalCart = () => {
    var t = 0;
    if (allProductInCart) {
      allProductInCart.map((p) => {
        const totalOfP = p.price * p.quantityInCart;
        t += totalOfP;
      });
    }
    //setTotalPrice(Number.parseFloat(t).toFixed(2));
    return Number.parseFloat(t).toFixed(2);
  };

  const addToCart = (productToAdd, operation) => (e) => {
    e.preventDefault();
    if (operation === "add") {
      productToAdd.quantityInCart++;
    } else {
      productToAdd.quantityInCart--;
    }

    var cart = [];
    if (!localStorage.getItem("cart")) {
      productToAdd.quantityInCart = 1;
      cart.push(productToAdd);
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      const allProductInLocal = localStorage.getItem("cart");
      const found = JSON.parse(allProductInLocal).find(
        (e) => e._id === productToAdd._id,
      );
      if (found) {
        if (operation === "add") {
          found.quantityInCart += 1;
        } else {
          found.quantityInCart -= 1;
        }

        cart.push(found);
        JSON.parse(allProductInLocal).forEach((p) => {
          if (p._id !== found._id) {
            cart.push(p);
          }
        });
      } else {
        productToAdd.quantityInCart = 1;
        cart.push(productToAdd);
        JSON.parse(allProductInLocal).forEach((p) => {
          cart.push(p);
        });
      }

      //cart.push(p);
      console.log(cart);
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    dispatch(setCart());
    const tToUpdate = document.getElementById(
      `${productToAdd.price + productToAdd._id}`,
    );
    tToUpdate.textContent = `${total(productToAdd)} `;

    const tIndicator = document.getElementById(`${productToAdd._id}`);
    tIndicator.textContent++;

    setTotalPrice(totalCart());
    console.log(totalCart());
  };

  return (
    <div className="row mx-0" style={{ marginBottom:"150px!important" }}>
      {allProductInCart && totalPrice}
      {allProductInCart &&
        allProductInCart.map((product, i) => (
          <div
            key={i}
            className="col-10 my-3 py-2 d-flex mx-auto rounded bg-white"
          >
            <div className="col-6 d-flex align-items-center">
              <img
                src={product.imageUrl}
                style={{ width: "80px", height: "80px" }}
              />
              <div
                className="ml-5"
                style={{
                  textTransform: "uppercase",
                  fontWeight: "600",
                  lineHeight: "16px",
                  fontSize: "12px",
                }}
              >
                {product.productName}
              </div>
            </div>
            <div className="col-6 d-flex align-items-center">
              <p className="ml-auto">
                <strong id={product.price + product._id}>
                  {total(product)}{" "}
                </strong>
                <strong>&euro;</strong>
              </p>
              <div
                className="btn-group ml-4"
                role="group"
                aria-label="Quantité"
              >
                <button
                  type="button"
                  className="btn bg-third text-dark"
                  onClick={addToCart(product, "remove")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cart-dash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                    />
                  </svg>
                </button>
                <div className="bg-third p-2">
                  <div
                    id={product._id}
                    className="bg-danger d-flex justify-content-center text-white"
                    style={{
                      width: "25px",
                      height: "25px",
                      borderRadius: "12.5px",
                    }}
                  >
                    {product.quantityInCart}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn bg-third text-dark"
                  onClick={addToCart(product, "add")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-cart-plus"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M8.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CartRecap;