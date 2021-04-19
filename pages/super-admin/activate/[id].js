import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import LoadingState from "../../../components/admin/LoadingState";
import dynamic from "next/dynamic";
const DynamicComponentWithNoSSR = dynamic(
  () => import("../../../components/admin/Navbar"),
  { ssr: false },
);
import { withRouter } from "next/router";
import Layout from "../../../components/Layout";

const ActivateAccount = ({ router }) => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    email: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });
  const { email, token, buttonText, success, error } = state;

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000);
    let token = router.query.id;
    if (token) {
      const { email } = jwt.decode(token);
      setState({ ...state, email, token });
    }
  }, [router]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    // console.log('activate acccount');
    setState({ ...state, buttonText: "Activating" });

    try {
      const response = await axios.post(`/api/register/activate-super-admin`, {
        token,
      });
      // console.log('account activate response', response)
      setState({
        ...state,
        email: "",
        token: "",
        buttonText: "Activated",
        success: response.data,
      });
      router.push("/login");
    } catch (error) {
      setState({ ...state, buttonText: "Activate Account", error: error });
    }
  };

  return (
    <Layout>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <DynamicComponentWithNoSSR />
          <div className="d-flex align-items-center">
            <div className="col-md-6 offset-md-3">
              <h1>
                G'day {email}, Ready to activate your account of Super Admin?
              </h1>
              <br />
              <button
                className="btn btn-outline-warning btn-block"
                onClick={clickSubmit}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default withRouter(ActivateAccount);
