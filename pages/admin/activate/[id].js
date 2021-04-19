import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { withRouter } from "next/router";
import Layout from "../../../components/Layout";
import LoadingState from "../../../components/admin/LoadingState";
import Navbar from "../../../components/admin/Navbar"

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
    let token = router.query.id;
    if (token) {
      const { email } = jwt.decode(token);
      setState({ ...state, email, token });
      setTimeout(function () {
        setLoading(false);
      }, 3000);
    }
  }, [router]);

  const clickSubmit = async (e) => {
    e.preventDefault();
    // console.log('activate acccount');
    setState({ ...state, buttonText: "Activating" });

    try {
      const response = await axios.post(`/api/register/activate-admin`, {
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
      setState({ ...state, buttonText: "Activate Account", error });
    }
  };

  return (
    <Layout>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <Navbar />
          <div className="d-flex align-items-center vh-100 position-absolute" style={{top:"0"}}>
            <div className="col-md-6 offset-md-3">
              <h1>Bonjour {email}, prêt pour la création de votre compte?</h1>
              <br />
              <button
                className="btn btn-outline-primary btn-block"
                onClick={clickSubmit}
              >
                  {error && JSON.stringify(error)}
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
