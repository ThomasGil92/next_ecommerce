import Layout from "../../../../components/Layout";
import PublicNavbar from "../../../../components/public/PublicNavbar.js";
import moment from "moment";
import "moment/locale/fr";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../../redux/actions";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";

const OrdersHistoric = ({ user, orders }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useSelector((state) => state.theme);
  const userAuth = useSelector((state) => state.user);

  useEffect(() => {
    if (process.browser) {
      if (sessionStorage.getItem("user")) {
        const userInSession = JSON.parse(sessionStorage.getItem("user"));
        console.log(router.query);
        if (userInSession.user._id !== router.query.id) {
          router.push("/user/login");
        }
      } else if (!userAuth.token) {
        router.push("/user/login");
      }
    }
  });

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
    <Layout title="Commandes"><PublicNavbar />
      {userAuth.token ? (
        <>
          <div
            className={
              theme === "dark"
                ? "row mt-md-5 pt-md-5 pt-3 mt-40 pb-md-5 mx-0 bg-dark text-white"
                : "row mt-md-5 pt-md-5 pt-3 mt-40 pb-md-5 mx-0 bg-third"
            }
          >
            <div className="col-12 text-center">
              <h3>Vos commandes</h3>
              {orders &&
                orders.map((order, i) => {
                  return (
                    <div
                      key={i}
                      className={
                        theme === "dark"
                          ? "col-10 px-0 card mx-auto my-5 text-left bg-dark border-warning"
                          : "col-10 px-0 card mx-auto my-5 text-left"
                      }
                    >
                      <div
                        className={
                          theme === "dark"
                            ? "d-flex bg-dark border-bottom py-1"
                            : "d-flex bg-third border-bottom py-1"
                        }
                      >
                        <div className="col-3 card-title">
                          <p className="mb-0 text-uppercase">
                            Commande effectuée le: <br />
                            <span className="text-lowercase">
                              {moment(order.createdAt).format("DD MMMM YYYY")}
                            </span>
                          </p>
                        </div>
                        <div className="card-title col-2 pb-0">
                          <p className="mb-0 text-uppercase">
                            total:
                            <br /> EUR {order.ordered_objects.price}&euro;
                          </p>
                        </div>
                        <div className="card-title col-2 pb-0">
                          <p className="mb-0" data-for={user._id} data-tip>
                            <span className="text-uppercase">Livraison à:</span>
                            <br />
                            {order.shipping_address.first_name}{" "}
                            {order.shipping_address.last_name}{" "}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-caret-down"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
                            </svg>
                          </p>
                          <ReactTooltip
                            id={user._id}
                            place="bottom"
                            type="dark"
                            className="text-white bg-dark"
                          >
                            {order.shipping_address.first_name}{" "}
                            {order.shipping_address.last_name}
                            <br />
                            {order.shipping_address.address}
                            <br />
                            {order.shipping_address.zip_code}{" "}
                            {order.shipping_address.city}
                            <br />
                            {order.shipping_address.country}
                          </ReactTooltip>
                        </div>
                        <div className="card-title col-2">
                          <p className="mb-0">
                            <span className="text-uppercase"> Status:</span>
                            <br />
                            {(order.state === "UNCHECKED" &&
                              "Pas encore envoyée") ||
                              (order.state === "SENT" && "Commande envoyée")}
                          </p>
                        </div>
                        <div className="card-title col-3 pb-0 text-right">
                          <p className="mb-0">
                            <span className="text-uppercase">
                              Numéro de commande:
                            </span>
                            <br />
                            N° {order._id}
                          </p>
                        </div>
                      </div>
                      {order.ordered_objects.list.map((items, i) => {
                        return (
                          <div
                            key={i}
                            className={
                              theme === "dark"
                                ? "d-flex w-100 my-2 bg-dark text-white"
                                : "d-flex w-100 my-2 bg-white"
                            }
                          >
                            <div className="col-md-2">
                              <img
                                src={items.imageUrl}
                                width="180"
                                alt={items.productName}
                              />
                            </div>
                            <div className="col-md-8">
                              <div className="card-body border py-1 h-100 d-flex flex-column justify-content-between">
                                <div>
                                  <h5 className="text-uppercase">
                                    {items.productName}
                                  </h5>
                                  <p className="card-text">
                                    {items.description}
                                  </p>
                                </div>
                                <div>
                                  <span>EUR {items.price}&euro;</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <button
                                type="button"
                                className="btn btn-danger w-100 px-2 d-flex align-items-center"
                              >
                                <motion.div
                                  whileHover={{ rotate: 360 }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    fill="currentColor"
                                    className="bi bi-arrow-repeat"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                    <path
                                      fill-rule="evenodd"
                                      d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                                    />
                                  </svg>
                                </motion.div>
                                <p
                                  style={{ lineHeight: "1", marginBottom: "0" }}
                                  onClick={addToCart(items)}
                                >
                                  Acheter à nouveau
                                </p>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default OrdersHistoric;
export async function getServerSideProps(context) {
  const { id } = context.query;
  const userUrl = await fetch(`${process.env.REST_API}/api/user/get/${id}`);
  const user = await userUrl.json();
  const order_id = user.user.orders;
  console.log("order_id",order_id)
  const orders = [];
  await Promise.all(
    order_id.map(async (id) => {
      const orderUrl = await fetch(
        `${process.env.REST_API}/api/user/order/${id}`,
      );
      const order = await orderUrl.json();
      orders.push(order);
    }),
  );
  return { props: { user, orders } };
}
