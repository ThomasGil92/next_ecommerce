import Layout from "../../components/Layout";
import PublicNavbar from "../../components/public/PublicNavbar.js";
import UserRegisterForm from "../../components/user/UserRegisterForm";

const UserRegister = () => {
  return (
    <Layout>
      <PublicNavbar />
      <UserRegisterForm/>
    </Layout>
  );
};

export default UserRegister;
