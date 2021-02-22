import Layout from "../components/Layout";
import PublicNavBar from "../components/public/PublicNavBar";
import CartRecap from "../components/public/CartRecap";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const Cart = ({ products }) => {
  const [totalNumberOfArticle, setTotalNumberOfArticle] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (process.browser) {
      if (localStorage.getItem("cart")) {
        var cart = JSON.parse(localStorage.getItem("cart"));
        var t = 0;
        cart.map((p) => {
          t += p.quantityInCart;
        });
        setTotalNumberOfArticle(t);

        var t2 = 0;
        cart.map((p) => {
          const totalOfP = p.price * p.quantityInCart;
          t2 += totalOfP;
        });
        setTotalPrice(Number.parseFloat(t2).toFixed(2));
      }
    }
  }, [cart]);

  return (
    <Layout title="Panier">
      <PublicNavBar products={products} />
      <div
        className={
          theme === "dark"
            ? "row flex-column mt-5 pt-3 mx-0 bg-dark"
            : "row flex-column mt-5 pt-3 mx-0 bg-third"
        }
      >
        <div className="col-6 py-3 mx-auto d-flex justify-content-between">
          <div
            className="circle bg-warning m-2 text-center text-center d-flex justify-content-center align-items-center"
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "37.5px",
              zIndex: "1",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-cart-check text-danger"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
              />
              <path
                fillRule="evenodd"
                d="M11.354 5.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </div>
          <div
            className="circle bg-third m-2 d-flex justify-content-center align-items-center text-white"
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "37.5px",
              zIndex: "1",
              backgroundColor: "#e6e6e6",
            }}
          >
            <strong style={{ fontSize: "25px" }}>2</strong>
          </div>
          <div
            className="circle m-2 d-flex justify-content-center align-items-center text-white"
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "37.5px",
              zIndex: "1",
              backgroundColor: "#e6e6e6",
            }}
          >
            <strong style={{ fontSize: "25px" }}>3</strong>
          </div>
        </div>
        <div
          className="col-5 position-absolute"
          style={{
            minHeight: "4px",
            top: 125,
            left: "30%",
            zIndex: "0",
            backgroundColor: "#e6e6e6",
          }}
        ></div>
      </div>
      <div style={{ marginBottom: "150px" }}>
        <CartRecap />
      </div>
      <div
        className={theme==="dark"?"row m-0 d-flex justify-content-between fixed-bottom px-4 pb-5":"row m-0 d-flex justify-content-between gradient-for-cart-footer fixed-bottom px-4 pb-5"}
        style={{ minHeight: "130px", fontFamily: "Montserrat, sans-serif" }}
      >
        <div>
          <Link href={"/"} passHref>
            <button className="btn bg-secondary text-white d-flex align-items-center h-100">
              <div className="d-flex align-items-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  class="bi bi-arrow-bar-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5zM10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </div>
              <div className="d-flex flex-column text-left">
                <span style={{ lineHeight: "15px", fontSize: "20px" }}>
                  Continuer
                </span>
                <span style={{ lineHeight: "11px" }}>mes achats</span>
              </div>
            </button>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <div
            className="d-flex flex-column text-right"
            style={{ color: "#a5a5a5" }}
          >
            <span style={{ fontSize: "20px", fontWeight: "500" }}>
              Sous total
            </span>
            <span style={{ fontSize: "9px", fontWeight: "600" }}>
              {totalNumberOfArticle} articles
            </span>
          </div>
          <div className="text-success ml-3" style={{ fontSize: "38px" }}>
            {totalPrice} &euro;
          </div>
        </div>
        <div>
          <Link
            href={
              user.user ? `/cart/livraison/${user.user._id}` : "/user/login"
            }
            passHref
          >
            <button className="btn btn-success h-100">
              Valider mon panier
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};
export default Cart;
export async function getServerSideProps(context) {
  const productsUrl = await fetch(`${process.env.REST_API}/api/categories/get`);
  const products = await productsUrl.json();

  return { props: { products } };
}
