import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import PublicNavbar from "../../../components/public/PublicNavbar.js";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { mutate } from "swr";

const UpdatePassword = () => {
  const userAuth = useSelector((state) => state.user);
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    buttonText: "Enregistrer le nouveau mot de passe",
    error: "",
  });
  const { email, password, buttonText, passwordConfirm } = state;
  let token = router.query.token;
  useEffect(() => {
    if (userAuth.token) {
      router.push("/");
    }
    if (token) {
      const { email } = jwt.decode(token);
      setState({
        ...state,
        email,
      });
    }
  }, [router]);

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const updatePassword = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(
        `${process.env.REST_API}/api/user/password-update`,
        {
          state,
          token,
        },
      );
      const { message } = await response;
      mutate(
        `${process.env.REST_API}/api/user/password-update`,
        message,
        false,
      );
      router.push('/user/login');
    } catch (error) {
      setState({ ...state, error: error });
      console.log(error);
    }
  };

  return (
    <Layout>
      {userAuth.token ?(
        <>
        <PublicNavbar />
        <div className="d-flex align-items-center">
          <div className="col-md-6 offset-md-3 mt-5 pt-5">
            <h1>Bienvenue {email && email}</h1>
            <form onSubmit={updatePassword}>
              <h4 className="mt-4">Nouveau mot de passe:</h4>
              <div>
                <input
                  id="password1"
                  placeholder="*********"
                  onChange={handleChange("password")}
                  type="password"
                  className="form-control"
                />
                <small id="passwordHelp" className="form-text text-muted px-3">
                  Renseignez votre nouveau mot de passe (8 caractères minimum)
                </small>
              </div>
              {password !== "" && password.length > 7 && (
                <div className="mt-3">
                  <input
                    id="passwordConfirm"
                    readOnly={password === ""}
                    placeholder="*************"
                    type="password"
                    onChange={handleChange("passwordConfirm")}
                    className="form-control"
                  />
                  <small
                    id="passwordConfirmHelp"
                    className="form-text text-muted px-3"
                  >
                    Veuillez retaper votre nouveau mot de passe
                  </small>
                </div>
              )}

              <div className="mt-5">
                <button
                  className="btn btn-primary text-center w-100 py-4"
                  disabled={password === "" || passwordConfirm !== password}
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
      ):("")}
      
    </Layout>
  );
};

export default UpdatePassword;
