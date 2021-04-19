import Layout from "../../components/Layout";
import { useEffect } from "react";
import PublicNavbar from "../../components/public/PublicNavbar.js";
import UserLoginForm from "../../components/user/UserLoginForm";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const userAuth = useSelector((state) => state.user);
  useEffect(() => {
    if (userAuth.token) {
      router.push("/");
    }
  });
  return (
    <Layout title="Connexion">
      {!userAuth.token && (
        <>
          <PublicNavbar />
          <UserLoginForm />
        </>
      )}
    </Layout>
  );
};
export default Login;
