import Layout from "../../components/Layout";
import PublicNavBar from "../../components/public/PublicNavBar";
import ForgotPasswordForm from "../../components/user/ForgotPasswordForm";

const PasswordForgot = () => {
  return (
    <Layout>
      <PublicNavBar />
      <ForgotPasswordForm/>
    </Layout>
  );
};
export default PasswordForgot;
