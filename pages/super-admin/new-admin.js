import { useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import dynamic from 'next/dynamic'
const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/admin/Navbar'),
    { ssr: false }
  )

const AdminRegister = () => {
  const [loading,setLoading]=useState(false)
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
    buttonText: "Créer un Admin",
  });

  const { email, password, buttonText, error } = state;

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
    setLoading(true)
    setState({ ...state, buttonText: "Envoie en cours" });
    try {
      const response = await axios.post(`/api/register/admin`, {
        email,
        password,
      });
      console.log(response)
      setState({
        ...state,
        email: "",
        password: "",
        buttonText: "Mail envoyé",
        success: response.data.message,
      });
      setLoading(false)
    } catch (error) {
       setLoading(false)
      setState({
        ...state,
        buttonText: "Register",
        error: error.response.data.error,
      });
    }
  };

  const registerForm = () => (
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
          className="form-control"
          placeholder="Type your password"
          required
        />
      </div>
      {error && alert(error)}
      <div className="form-group">
        <button className="btn btn-outline-warning" disabled={loading ||email===""||password===""}>{buttonText}</button>
      </div>
    </form>
  );

  return (
    <Layout>
      <DynamicComponentWithNoSSR />
      <div className="container py-5">
        <div className="col-6 mx-auto">
        {registerForm()}
        </div>
      </div>
    </Layout>
  );
};
export default AdminRegister;
