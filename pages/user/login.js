import Layout from "../../components/Layout";
import { useEffect } from "react";
import PublicNavBar from "../../components/public/PublicNavBar";
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
    <Layout>
      <PublicNavBar />
      <UserLoginForm />
    </Layout>
  );
};
export default Login;
