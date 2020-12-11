import { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/admin/Navbar'),
    { ssr: false }
  )
const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Créer Super Admin",
  });

  const { email, password, buttonText,error } = state;

  const handleChange = (name) => (e) => {
    setState({
      ...state,
      [name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.table({
      email,
    });
    setState({ ...state, buttonText: "Enregistrement en cours..." });
    try {
      const response = await axios.post(`/api/register/super-admin`, {
        email,
        password,
      });
      setState({
        ...state,
        email: "",
        password: "",
        buttonText: "Submitted",
        success: response.data.message,
      });
    } catch (error) {;
      setState({
        ...state,
        buttonText: "Register",
        error: error.response.data.error,
      });
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      {JSON.stringify(state)}

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
          className="form-control"
          placeholder="Type your password"
          required
        />
      </div>
      {error && alert(error)}
      <div className="form-group">
        <button className="btn btn-outline-warning">{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <DynamicComponentWithNoSSR/>
      <div className="container">{registerForm()}</div>
    </Layout>
  );
};
export default Register;
