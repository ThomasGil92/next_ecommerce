import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import NavBar from "../components/admin/Navbar";
import OrderDetail from "../components/admin/OrderDetail"
import SideBar from "../components/admin/SideBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const AdminDashboard = ({ orders }) => {
  const router = useRouter();
  const [selectedOrders, setSelectedOrders] = useState(true);
  const isAuth = useSelector((state) => state.admin);
  const theme = useSelector((state) => state.theme);

  useEffect(() => {
    if (!sessionStorage.getItem("admin") && !sessionStorage.getItem("master")) {
      router.push("/login-admin");
    }
    console.log(orders);
  }, []);

  return (
    <Layout title="Dashboard">
      {process.browser && sessionStorage.getItem("admin") ? (
        <>
          <NavBar />
          <div className="row p-0 m-0">
            <SideBar setSelectedOrders={setSelectedOrders} />
            <div className="text-center col-md-10 offset-md-2 mt-5 mb-2 py-4">
              <h1 className={theme && theme==="dark"?"text-white":"text-dark"}>{isAuth.admin && isAuth.admin.name}</h1>
              <div className="row mt-5">
                {selectedOrders === true &&
                  (orders.length > 0 ? (
                    orders.map((order, i) => {
                      return (
                        <div
                          key={i}
                          className={
                            theme === "dark"
                              ? "col-11 p-3 d-flex text-left mx-auto border-top border-bottom border-warning my-2 mb-5 text-white"
                              : "col-11 p-3 d-flex text-left mx-auto border-top border-bottom border-warning my-2 mb-5"
                          }
                        >
                          <OrderDetail order={order}/>
                        </div>
                      );
                    })
                  ) : (
                    <div className="mx-auto">
                      <h4>Pas de commandes en cours</h4>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default AdminDashboard;

export async function getServerSideProps(context) {
  const ordersUrl = await fetch(`${process.env.REST_API}/api/orders/get`);
  const orders = await ordersUrl.json();

  return { props: { orders } };
}
