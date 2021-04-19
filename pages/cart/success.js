import Layout from "../../components/Layout";
import PublicNavbar from "../../components/public/PublicNavbar.js";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
const success = () => {
  const [products, setProducts] = useState();
  const [subTotal, setSubTotal] = useState();
  const [cs, setCs] = useState();

  const theme = useSelector((state) => state.theme);
  const authUser = useSelector((state) => state.user);

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    let sub_total = 0;
    if (process.browser) {
      if (localStorage.getItem("cart") && sessionStorage.getItem("user")) {
        var cart = JSON.parse(localStorage.getItem("cart"));
        setProducts(cart);
        const user = JSON.parse(sessionStorage.getItem("user")).user;
        cart.forEach((product) => {
          var q = 0;
          q += product.quantityInCart;
          sub_total += q * product.price;
        });
        setSubTotal(Number.parseFloat(sub_total).toFixed(2));
        const cs = JSON.parse(localStorage.getItem("session"));
        const id = cs.data.id;
        async function retrieve() {
          const res = await fetch(
            `${process.env.REST_API}/api/checkout/session/${id}`,
          );
          const { session } = await res.json();
          setCs(session);
        }
        async function mailConfirmation() {
          const response = await axios.post(
            `${process.env.REST_API}/api/checkout/session/emailSuccess`,
            {
              user,
              cs,
            },
          );
        }

        async function createOrder() {
          const response = await axios.post(
            `${process.env.REST_API}/api/orders/saveNewOrder`,
            {
              user,
              cart,
              sub_total,
            },
          );
        }

        async function updateStock() {
          cart.forEach(async (product) => {
            console.log(product);
            const response = await axios.put(
              `${process.env.REST_API}/api/products/productStockUpdate`,
              {
                product,
              },
            );
          });
        }

        retrieve().then((session) => {
          mailConfirmation().then((res) => {
            createOrder().then((response) => {
              updateStock().then(()=>{
                localStorage.removeItem("cart");
              })
              
            });
          });
        });

        dispatch(clearCart());
      } else {
        router.push("/");
      }
    }
  }, []);

  return (
    <Layout>
      <PublicNavbar />
      {authUser.token ? (
        <>
          <div
            className={
              theme === "dark"
                ? "row flex-column mt-5 pt-3 mx-0 bg-dark text-white"
                : "row flex-column mt-5 pt-3 mx-0 bg-third"
            }
          >
            <div className="col-6 py-3 mx-auto d-flex justify-content-between">
              <div
                className="circle m-2 bg-warning text-center text-center d-flex justify-content-center align-items-center"
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "37.5px",
                  zIndex: "1",
                  backgroundColor: "#e6e6e6",
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
                className="circle bg-warning m-2 d-flex justify-content-center align-items-center text-white"
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "37.5px",
                  zIndex: "1",
                  backgroundColor: "#e6e6e6",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-truck text-danger"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </div>
              <div
                className="circle bg-warning m-2 d-flex justify-content-center align-items-center"
                style={{
                  width: "75px",
                  height: "75px",
                  borderRadius: "37.5px",
                  zIndex: "1",
                  backgroundColor: "#e6e6e6",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  className="bi bi-hand-thumbs-up text-danger"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                </svg>
              </div>
            </div>
            <div
              className="col-5 position-absolute"
              style={{
                minHeight: "4px",
                top: 125,
                left: "30%",
                zIndex: "0",
                background: "rgba(255,193,7,1)",
              }}
            ></div>
            <div className="col-6 mt-5 mx-auto text-center">
              <h1>Bravo, votre commande a bien été validée</h1>
              <div
                className={
                  theme === "dark"
                    ? "card bg-dark border border-warning"
                    : "card"
                }
              >
                Votre commande:
                <div className="card-body text-left">
                  {products &&
                    products.map((product, i) => {
                      return (
                        <div key={i} className="col-12 d-flex">
                          <div className="col-5">
                            <p className="text-uppercase">
                              {product.productName}
                            </p>
                          </div>
                          <div className="col-7 text-right">
                            <p className="">
                              PU = {product.price}&euro; | Quantité{" "}
                              {product.quantityInCart} | Total ={" "}
                              {product.quantityInCart * product.price}&euro;
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  <div
                    className="col-12 text-right mt-4"
                    style={{ padding: "0 30px 0 30px" }}
                  >
                    <p className="font-weight-bold">
                      <span className="text-uppercase">sous-total: </span>
                      {subTotal && subTotal}&euro;
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/" passHref>
                <a className="nav-link">Retour à l'accueil</a>
              </Link>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </Layout>
  );
};
export default success;
