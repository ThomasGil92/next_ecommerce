import { useState,useEffect } from "react";
import {withRouter} from 'next/router'
import { useDispatch } from "react-redux";
import { setAdmin } from "../redux/actions";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout";
import LoadingState from "../components/admin/LoadingState";
import NavBar from'../components/admin/Navbar'


const Login = ({ router }) => {
  const isAuth = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Se connecter",
  });
  const { email, password, error, success, buttonText } = state;

useEffect(()=>{
  setLoading(true);
  if (sessionStorage.getItem("admin") || sessionStorage.getItem("master")) {
    router.push("/admin-dashboard");
    setLoading(false)
  } else{
    setLoading(false)
  }
}, [isAuth]);

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: false,
      success: "",
      buttonText: "Login",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, buttonText: "Logging in" });
    setClicked(true)
    try {
      const response = await axios.post(`${process.env.REST_API}/api/admin/adminSignin`, {
        email,
        password,
      });
      console.log(response); // data > token / user
      if (response.data.admin.role === 2) {
        sessionStorage.setItem("master", JSON.stringify(response.data));
      }
      if (response.data.admin.role === 1) {
        sessionStorage.setItem("admin", JSON.stringify(response.data));
      }
      dispatch(setAdmin())
        router.push("/admin-dashboard");
    } catch (error) {
      console.log(error);
      setState({ ...state, buttonText: "Login", error:true });
      setClicked(false)
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          value={email}
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Type your email"
          required
        />
      </div>
      <div className="form-group">
        <input
          value={password}
          onChange={handleChange("password")}
          type="password"
          className={error?"form-control border-danger":"form-control"}
          placeholder="Type your password"
          required
        />
      </div>
      <div className="form-group">
        <button className="btn btn-outline-warning" disabled={clicked}>{buttonText}</button>
      </div>
    </form>
  );
  return (
    <Layout>
        <>
        <NavBar />
      <div className="container text-center mt-md-5 pt-md-5">
        <div className="mx-auto col-5 py-5">{loginForm()}</div>
      </div>
      </>
    </Layout>
  );
};

export default withRouter(Login);
