import Layout from "../../../components/Layout";
import PublicNavBar from "../../../components/public/PublicNavbar";
import CartShippingAddress from "../../../components/public/CartShippingAddress";
import CartValidation from "../../../components/public/CartValidation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Livraison = ({ user }) => {
  const [address, setAddress] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      var cart = JSON.parse(localStorage.getItem("cart"));
      var t = 0;
      cart.map((p) => {
        const totalOfP = p.price * p.quantityInCart;
        t += totalOfP;
      });
      setTotalPrice(Number.parseFloat(t).toFixed(2));
    }
  }, []);
  return (
    <Layout title="Adresse de livraison">
      <PublicNavBar />
      <div className={theme==="dark"?"row flex-column mt-5 pt-3 mx-0 bg-dark":"row flex-column mt-5 pt-3 mx-0 bg-third"}>
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
            background:
              "linear-gradient(90deg, rgba(255,193,7,1) 50%, rgba(230,230,230,1) 50%)",
          }}
        ></div>
        <div className="col-12 d-flex justify-content-between mx-0 px-5">
          <CartShippingAddress
            setAddress={setAddress}
            infos={user.user}
            token={router.query.token}
          />
          <CartValidation address={address} total={totalPrice} />
        </div>
      </div>
    </Layout>
  );
};
export default Livraison;

export async function getServerSideProps(context) {
  const { id } = context.query
  console.log(context.query)
  const userUrl = await fetch(`${process.env.REST_API}/api/user/get/${id}`);
  const user = await userUrl.json();
  return { props: { user } };
}
