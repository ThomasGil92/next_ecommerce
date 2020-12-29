import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import PublicNavBar from "../../../components/public/PublicNavBar";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";

const UpdateAddress = ({ userInfos }) => {
  const userAuth = useSelector((state) => state.user);
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    address: "",
    first_name: "",
    last_name: "",
    zip_code: "",
    city: "",
    country: "",
    buttonText: "Enregistrer les modifications",
    error: "",
  });
  const {
    email,
    address,
    first_name,
    last_name,
    zip_code,
    city,
    country,
    buttonText,
    error,
  } = state;

  useEffect(() => {
    setState({
        email:userInfos.user.email,
    address:userInfos.user.address,
    first_name:userInfos.user.first_name,
    last_name:userInfos.user.last_name,
    zip_code:userInfos.user.zip_code,
    city:userInfos.user.city,
    country:userInfos.user.country,
    })
  }, []);

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const updateAddress = async (e) => {
    try {
      const response = await axios
        .put(`/api/user/address-update`, {
          state,
        })
        .then((err, result) => {
          if (err) {
            console.log(err);
          }
        });
      window.location.replace("http://localhost:3000/user/login");
    } catch (error) {
      setState({ ...state, error: error });
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        <PublicNavBar />
        <div className="d-flex align-items-center">
          <div className="col-md-6 offset-md-3 mt-5 pt-5">
            {state && JSON.stringify(state)}
          </div>
        </div>
      </>
    </Layout>
  );
};
export async function getServerSideProps({ params }) {
  const token = params.token;
  const { _id } = jwt.decode(token);
  const userUrl = await fetch(`http://localhost:3000/api/user/get/${_id}`);
  const userInfos = await userUrl.json();

  return { props: { userInfos } };
}

export default UpdateAddress;
