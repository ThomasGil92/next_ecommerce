import { useState } from "react";
import axios from "axios";

const UserLoginForm = () => {
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [userFields, setUserFields] = useState({
    first_name: "",
    last_name: "",
    address: "",
    zip_code: "",
    city: "",
    country: "",
    email: "",
    password: "",
    buttonText: "Envoyer",
  });
  const {
    first_name,
    last_name,
    address,
    zip_code,
    city,
    country,
    email,
    password,
    buttonText,
  } = userFields;

  const handleChange = (name) => (e) => {
    setError("");
    setUserFields({ ...userFields, [name]: e.target.value });
    if (
      (first_name !== ""&&
      last_name !== ""&&
      address !== ""&&
      zip_code !== ""&&
      city !== ""&&
      country !== ""&&
      password!==""&&
      email !== "")
    ) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  };

  const handleSelect = (e) => {
    setUserFields({ ...userFields, country: e.target.value });
    if (
      (first_name !== ""&&
      last_name !== ""&&
      address !== ""&&
      zip_code !== ""&&
      city !== ""&&
      country !== ""&&
      password!==""&&
      email !== "")
    ) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUserFields({ ...userFields, buttonText: "Envoi en cours" });
      if (
        (first_name !== ""&&
        last_name !== ""&&
        address !== ""&&
        zip_code !== ""&&
        city !== ""&&
        country !== ""&&
        password !== ""&&
        email !== "")
      ) {
        const response = await axios.post(`${process.env.REST_API}/api/user/confirmation`, {
          userFields,
        });
        console.log(response);
        setUserFields({
          ...userFields,
          first_name: "",
          last_name: "",
          address: "",
          zip_code: "",
          city: "",
          country: "",
          email: "",
          password: "",
          buttonText: `Email envoyé à "${email}"`,
        });
        setCompleted(false);
      }
    } catch (err) {
      setError("Cet Email est déja utilisé");
    }
  };

  return (
    <div className="row mt-5 pt-5 pb-5 mx-0 text-center loginUser">
      <div className="col-10 text-center mx-auto">
        <h2 className="text-secondary">Créez votre compte</h2>
        {error && error !== "" && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group my-4">
            <div className="row justify-content-between">
              <input
                style={{ maxWidth: "49%" }}
                type="text"
                name="first_name"
                onChange={handleChange("first_name")}
                placeholder="Prénom"
                value={first_name}
                className="form-control p-3"
              />
              <input
                style={{ maxWidth: "49%" }}
                type="text"
                name="last_name"
                onChange={handleChange("last_name")}
                placeholder="Nom"
                value={last_name}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group my-4">
            <div className="row">
              <input
                type="text"
                name="address"
                onChange={handleChange("address")}
                placeholder="Adresse"
                value={address}
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group my-4">
            <div className="row justify-content-between">
              <input
                style={{ maxWidth: "32%" }}
                type="number"
                name="zip_code"
                onChange={handleChange("zip_code")}
                placeholder="Code postal"
                value={zip_code}
                className="form-control"
              />
              <input
                style={{ maxWidth: "32%" }}
                type="text"
                name="city"
                onChange={handleChange("city")}
                placeholder="Ville"
                value={city}
                className="form-control"
              />
              <select
                style={{ maxWidth: "32%", height: "50px" }}
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
          <div className="form-group my-4">
            <div className="row justify-content-between">
              <input
                style={{ maxWidth: "49%" }}
                type="email"
                name="email"
                onChange={handleChange("email")}
                placeholder="Email"
                value={email}
                className="form-control p-3"
              />
              <input
                style={{ maxWidth: "49%" }}
                type="password"
                name="password"
                onChange={handleChange("password")}
                placeholder="Mot de passe (min 8 caractères)"
                value={password}
                className="form-control p-3"
              />
            </div>
          </div>
          <div className="form-group my-4">
            <div className="row justify-content-between">
              <button
                className="btn btn-outline-success w-100"
                title={
                  completed
                    ? "Envoyer le formulaire"
                    : "Veuillez remplir le formulaire entièrement"
                }
                style={{
                  cursor:completed?"pointer":"not-allowed",
                  minHeight: "70px",
                  fontWeight: "500",
                  fontSize: "25px",
                }}
                type="submit"
                disabled={!completed}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
