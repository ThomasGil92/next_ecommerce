import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import LoadingState from "../components/admin/LoadingState";
import NavBar from "../components/admin/Navbar";
import SideBar from "../components/admin/SideBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const AdminDashboard = () => {
  const router=useRouter()
  const [loading, setLoading] = useState(true);
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
            <SideBar />
            <div className="text-center col-10">
              <h1>{isAuth.admin && isAuth.admin.name}</h1>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default AdminDashboard;
