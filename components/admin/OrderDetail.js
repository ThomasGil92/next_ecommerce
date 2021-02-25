import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const OrderDetail = ({ order }) => {
  const theme = useSelector((state) => state.theme);

  const [state, setState] = useState(order.state);

  const makeOrder = (value) => async (e) => {
    e.preventDefault();
    const id = order._id;
    try {
      const res = await axios.put(
        `${process.env.REST_API}/api/order/makeOrderSent`,
        {
          id,
          value,
        },
      );
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-3 px-0">
        <div>ID: {order._id}</div>
        <table className="table table-bordered mt-2">
          <thead className="thead-light">
            <tr>
              <th scope="col">Quantité</th>
              <th scope="col">Nom</th>
            </tr>
          </thead>
          <tbody>
            {order.ordered_objects.list.map((objectToShip) => {
              return (
                <tr
                  key={objectToShip._id}
                  className={
                    theme === "dark"
                      ? "text-uppercase text-light"
                      : "text-uppercase"
                  }
                >
                  <td>x{objectToShip.quantityInCart}</td>
                  <td>{objectToShip.productName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="col-6 text-center">
        <h4>
          <u>Adresse:</u>
        </h4>
        <p>
          Prénom: {order.shipping_address.first_name}
          <br />
          Nom: {order.shipping_address.last_name}
          <br />
          N°/Rue: {order.shipping_address.address}
          <br />
          Code postal: {order.shipping_address.zip_code}
          <br />
          Ville: {order.shipping_address.city}
          <br />
          Pays: {order.shipping_address.country}
        </p>
      </div>
      <div className="col-3 text-right d-flex flex-column justify-content-between">
        <div>
          Status:{" "}
          {state === "UNCHECKED" && (
            <>
              <span>En attente</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-exclamation-triangle-fill ml-1 mb-1 text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            </>
          )}
          {state === "SENT" && (
            <>
              <span>Envoyé</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-hand-thumbs-up-fill ml-1 mb-1 text-success"
                viewBox="0 0 16 16"
              >
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.964.22.817.533 2.512.062 4.51a9.84 9.84 0 0 1 .443-.05c.713-.065 1.669-.072 2.516.21.518.173.994.68 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.162 3.162 0 0 1-.488.9c.054.153.076.313.076.465 0 .306-.089.626-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.826 4.826 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.616.849-.231 1.574-.786 2.132-1.41.56-.626.914-1.279 1.039-1.638.199-.575.356-1.54.428-2.59z" />
              </svg>
            </>
          )}
        </div>
        <div>
          {state !== "SENT" ? (
            <button className="btn btn-success" onClick={makeOrder("SENT")}>
              Commande envoyée
            </button>
          ) : (
            <button className="btn btn-danger" onClick={makeOrder("UNCHECKED")}>
              En attente
            </button>
          )}
        </div>
        <div>Total: {order.ordered_objects.price} &euro;</div>
      </div>
    </>
  );
};
export default OrderDetail;
