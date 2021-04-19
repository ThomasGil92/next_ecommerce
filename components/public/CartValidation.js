import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CartValidation = ({ address, total }) => {
  const [state, setState] = useState();
  const [completed, setCompleted] = useState(false);

  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (!address) {
      setState({ ...state, total });
    } else {
      setState({ ...state, address });
    }
  }, [address, total]);

  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    const response = await axios.post(
      `${process.env.NEXT_API}/api/checkout/createSession`,
      {
        total,
        address,
      },
    );
    localStorage.setItem("session", JSON.stringify(response));
    const session = await response;

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.data.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <div
      className={
        theme === "dark"
          ? "col-7 text-center mt-3 bg-dark h-100 border border-warning text-white px-0 "
          : "col-7 text-center mt-3 bg-white h-100 border border-light px-0 "
      }
      style={{
        borderRadius: "20px",
      }}
    >
      <h2>Récapitulatif de la commande</h2>
      <div className="row">
        <div className="col-6 mt-3 text-left px-5">
          {!address ? (
            <>
              <p className="text-danger lead">
                Veuillez valider votre adresse de livraison
              </p>
            </>
          ) : (
            <>
              <label className="lead">Adresse de livraison</label>
              <p className="mb-0" style={{ lineHeight: "1.2" }}>
                {address.first_name} {address.last_name}
                <br />
                {address.address}
                <br />
                {address.zip_code}
                <br />
                {address.city}
                <br />
                {address.country}
              </p>
            </>
          )}
        </div>
        <div className="col-6 mt-3 text-right px-5">
          <h3
            className="position-absolute mb-0"
            style={{ bottom: 0, right: 40 }}
          >
            Total: {total} &euro;
          </h3>
        </div>
      </div>
      <div className="col-12 d-flex px-0 mt-3">
        <button
          onClick={handleClick}
          className="btn w-100 btn-primary py-3"
          style={{
            borderRadius: "0 0 20px 20px",
            cursor: !address || !total ? "not-allowed" : "pointer",
          }}
          disabled={!address || !total}
        >
          Valider la commande
        </button>
      </div>
    </div>
  );
};
export default CartValidation;
