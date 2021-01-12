import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { mutate } from "swr";

const UserUpdateAddressForm = ({ user }) => {
  const userId = useSelector((state) => state.user);
  const router = useRouter();
  const [state, setState] = useState({
    address: user.address,
    first_name: user.first_name,
    last_name: user.last_name,
    zip_code: user.zip_code,
    city: user.city,
    country: user.country,
    buttonText: "Enregistrer les modifications",
    error: "",
  });
  const {
    address,
    first_name,
    last_name,
    zip_code,
    city,
    country,
    buttonText,
    error,
  } = state;

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };
  const handleSelect = (e) => {
    setUserFields({ ...userFields, country: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      /* const response = await axios.put(`/api/user/address-update`, {
        state,
      }); */
      const id=userId.user._id
      const response = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })
      const { data } = await response;
      mutate(`/api/user/${id}`, data,false); // Update the local data without a revalidation

      router.push(`/cart/livraison/${userId.token}`);
    } catch (error) {
      setState({ ...state, error: error });
      alert(error);
    }
  };
  return (
    <div className="col-8 text-left mx-auto">
      <form onSubmit={handleSubmit} className="loginUser">
        {state && JSON.stringify(state)}
        <div className="form-group my-4">
          <div className="row justify-content-between m-0">
            <div style={{ minWidth: "49%" }}>
              <h4>Nom</h4>
              <input
                type="text"
                onChange={handleChange("first_name")}
                placeholder={first_name}
                className="form-control"
              />
            </div>
            <div style={{ minWidth: "49%" }}>
              <h4>Prénom</h4>
              <input
                onChange={handleChange("last_name")}
                placeholder={last_name}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="form-group my-4">
          <div className="row m-0">
            <div className="w-100">
              <h4>Adresse</h4>
              <input
                onChange={handleChange("address")}
                placeholder={address}
                type="text"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="form-group my-4">
          <div className="row m-0 justify-content-between">
            <div style={{ minWidth: "32%" }}>
              <h4>Code postal</h4>
              <input
                type="number"
                name="zip_code"
                onChange={handleChange("zip_code")}
                placeholder="Code postal"
                value={zip_code}
                className="form-control"
              />
            </div>
            <div style={{ minWidth: "32%" }}>
              <h4>Ville</h4>
              <input
                type="text"
                name="city"
                onChange={handleChange("city")}
                placeholder="Ville"
                value={city}
                className="form-control"
              />
            </div>
            <div style={{ minWidth: "32%" }}>
              <h4>Pays</h4>
              <select
                style={{ height: "50px" }}
                className="custom-select"
                value={country}
                onChange={handleSelect}
              >
                <option selected value="">
                  Pays
                </option>
                <option value="France">France</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-5 w-100">
          <button
          type="submit"
            className="btn btn-primary text-center w-100 py-4"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateAddressForm;
