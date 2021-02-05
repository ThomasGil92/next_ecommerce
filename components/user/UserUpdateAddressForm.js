import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { mutate } from "swr";

const UserUpdateAddressForm = ({ user }) => {
  const userId = useSelector((state) => state.user);
  const router = useRouter();
  const [state, setState] = useState({
    address: user.user.address,
    first_name: user.user.first_name,
    last_name: user.user.last_name,
    zip_code: user.user.zip_code,
    city: user.user.city,
    country: user.user.country,
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
    e.preventDefault();
    try {
      /* const response = await axios.put(`/api/user/address-update`, {
        state,
      }); */
      const id = userId.user._id;
      const response = await axios.put(
        `${process.env.REST_API}/api/user/address-update/${id}`,
        {
          state,
        },
      );
      const { data } = await response;
      mutate(
        `${process.env.REST_API}/api/user/address-update/${id}`,
        data,
        false,
      ); // Update the local data without a revalidation
      router.push(`/cart/livraison/${id}`);
    } catch (error) {
      setState({ ...state, error: error });
      alert(error);
    }
  };
  return (
    <div className="col-11 col-md-8 text-left mx-auto pb-5">
      <h2 className="text-secondary text-center">Modifier l'adresse de livraison</h2>
      <form onSubmit={handleSubmit} className="loginUser">
        {state && state.address !== "" && (
          <>
            <div className="form-group my-4">
              <div className="row justify-content-between m-0">
                <div className="input-width-100" style={{ minWidth: "49%" }}>
                  <h4>Nom</h4>
                  <input
                    type="text"
                    onChange={handleChange("first_name")}
                    placeholder={first_name}
                    value={first_name}
                    className="form-control"
                  />
                </div>
                <div className="input-width-100 mt-4 mt-md-0" style={{ minWidth: "49%" }}>
                  <h4>Prénom</h4>
                  <input
                    onChange={handleChange("last_name")}
                    placeholder={last_name}
                    type="text"
                    value={last_name}
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
                    value={address}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="form-group my-4">
              <div className="row m-0 justify-content-between">
                <div className="input-width-100" style={{ minWidth: "32%" }}>
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
                <div className="input-width-100 mt-4 mt-md-0" style={{ minWidth: "32%" }}>
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
                <div className="input-width-100 mt-4 mt-md-0" style={{ minWidth: "32%" }}>
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
          </>
        )}

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
