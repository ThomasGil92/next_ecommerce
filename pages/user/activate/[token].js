import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import LoadingState from "../../../components/admin/LoadingState";
import PublicNavBar from "../../../components/public/PublicNavBar";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

const ActivateAccount = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    address: "",
    zip_code: "",
    city: "",
    country: "",
    email: "",
    password: "",
    token: "",
    buttonText: "Activate Account",
    success: "",
    error: "",
  });
  const {
    email,
    token,
    buttonText,
    first_name,
    last_name,
    address,
    zip_code,
    city,
    country,
    password,
  } = state;

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 3000);
    let token = router.query.token;
      //signup()
    if (token) {
      const {
        first_name,
        last_name,
        address,
        zip_code,
        city,
        country,
        email,
        password,
      } = jwt.decode(token);
      setState({
        ...state,
        first_name,
        last_name,
        address,
        zip_code,
        city,
        country,
        email,
        password,
        token,
      });
      axios.post(`/api/user/signup`, {
        token,
      }).then((err,result)=>{
          if(err){
              console.log(err)
          }
          console.log('account activate response', result)
      router.push("/");
      })
      
    }
  }, [router]);

   const signup = async (e) => {
    try {
      const response = await axios.post(`/api/user/signup`, {
        token,
      });
       console.log('account activate response', response)
      router.push("/");
    } catch (error) {
      setState({ ...state, error: error });
    }
  };

  return (
    <Layout>
      {loading ? (
        <LoadingState />
      ) : (
        <>
          <PublicNavBar />
          <div className="d-flex align-items-center">
            <div className="col-md-6 offset-md-3 mt-5 pt-5">
              Bienvenue {first_name} {last_name}
              <div>{state && JSON.stringify(state)}</div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default ActivateAccount;
