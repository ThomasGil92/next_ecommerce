import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setUser } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Link from "next/link";

const UserLoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [userFields, setUserFields] = useState({
    email: "",
    password: "",
    buttonText: "Se connecter",
  });
  const { email, password, buttonText } = userFields;

  const handleChange = (name) => (e) => {
    setError("");
    setUserFields({ ...userFields, [name]: e.target.value });
    if (email !== "" && password !== "") {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCompleted(false);
    setUserFields({ ...userFields, buttonText: "Tentative de connection" });
    try {
      const response = await axios.post(`/api/login/user`, {
        email,
        password,
      });
      console.log(response); // data > token / user
      sessionStorage.setItem("user", JSON.stringify(response.data));
      dispatch(setUser());
      router.push("/");
    } catch (error) {
      console.log(error);
      setUserFields({ ...userFields, buttonText: "Connection" });

      setError("Utilisateur introuvable ou données de connection non valides");
    }
  };

  return (
    <div className="row mt-5 pt-5 mx-0 text-center loginUser">
      <div className="col-7 text-center mx-auto">
        <h2 className="text-secondary">Connection</h2>
        {error && error !== "" && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
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
                    ? "Me connecter"
                    : "Veuillez remplir le formulaire entièrement"
                }
                style={{
                  cursor: completed ? "pointer" : "not-allowed",
                  minHeight: "70px",
                  fontWeight: "500",
                  fontSize: "25px",
                }}
                type="submit"
                disabled={!completed || password.length < 8}
              >
                {buttonText}
              </button>
              <Link href="/account/user-register" passHref>
                <a className="nav-link text-info px-0">Pas encore de compte?</a>
              </Link>
              <Link href="/account/password-forgot" passHref>
                <a className="nav-link text-info px-0 ml-auto">Mot de passe oublié?</a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLoginForm;
