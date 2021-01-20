import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LoadingState from "../components/admin/LoadingState";
import NavBar from "../components/admin/Navbar";
import SideBar from "../components/admin/SideBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const AdminDashboard = ({ orders }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState(false);
  const isAuth = useSelector((state) => state.admin);

  useEffect(() => {
    if (!sessionStorage.getItem("admin") && !sessionStorage.getItem("master")) {
      router.push("/login");
    } else {
      setTimeout(function () {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <Layout>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <NavBar />
          <div className="row p-0 m-0">
            <SideBar setSelectedOrders={setSelectedOrders} />
            <div className="text-center col-10">
              <h1>{isAuth.admin && isAuth.admin.name}</h1>
              <div className="row mt-5">
                {orders &&
                  selectedOrders &&
                  orders.orders.map((order, i) => {
                    return (
                      <div
                        key={i}
                        className="col-11 p-3 d-flex text-left mx-auto rounded border my-2"
                      >
                        <div className="col-3 px-0">
                          <div>ID: {order._id}</div>
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
                        <div className="col-3 text-right">
                          <div>
                            Status:{" "}
                            {order.state === "UNCHECKED" && "Non validé"}
                            {order.state === "CHECKED" && "Validé"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default AdminDashboard;

export async function getServerSideProps(context) {
  const ordersUrl = await fetch("http://localhost:3000/api/orders");
  const orders = await ordersUrl.json();

  return { props: { orders } };
}
