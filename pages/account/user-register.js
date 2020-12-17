import Layout from "../../components/Layout";
import PublicNavBar from "../../components/public/PublicNavBar";
import UserRegisterForm from "../../components/user/UserRegisterForm";

const UserRegister = () => {
  return (
    <Layout>
      <PublicNavBar />
      <UserRegisterForm/>
    </Layout>
  );
};

export default UserRegister;
