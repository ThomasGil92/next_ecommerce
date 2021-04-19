import Layout from "../../components/Layout";
import PublicNavbar from "../../components/public/PublicNavbar.js";
import ForgotPasswordForm from "../../components/user/ForgotPasswordForm";

const PasswordForgot = () => {
  return (
    <Layout>
      <PublicNavbar />
      <ForgotPasswordForm/>
    </Layout>
  );
};
export default PasswordForgot;
