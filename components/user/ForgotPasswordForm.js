import { useState } from "react";
import axios from "axios";

const ForgotPasswordForm = () => {
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [userFields, setUserFields] = useState({
    email: "",
    buttonText: "Envoyer",
  });
  const {
    email,
    buttonText,
  } = userFields;

  const handleChange = (name) => (e) => {
    setError("");
    setUserFields({ ...userFields, [name]: e.target.value });
    if (
      email !== ""
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
        email !== ""
      ) {
        const response = await axios.post(`/api/user/password-forgot`, {
          userFields,
        });
        console.log(response);
        setUserFields({
          ...userFields,
          email: "",
         buttonText: `Email envoyé à "${email}"`,
        });
        setCompleted(false);
      }
    } catch (err) {
      setError("Cet Email est déja utilisé");
    }
  };

  return (
    <div className="row mt-5 pt-5 mx-0 text-center loginUser">
      <div className="col-10 text-center mx-auto">
        <h2 className="text-secondary">Mot de passe oublié?</h2>
        {error && error !== "" && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group my-4">
            <div className="row justify-content-between">
              <input
                type="email"
                name="email"
                onChange={handleChange("email")}
                placeholder="Email"
                value={email}
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
                  cursor: completed ? "pointer" : "not-allowed",
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

export default ForgotPasswordForm;
