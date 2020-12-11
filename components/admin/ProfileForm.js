import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";

const ProfileForm = ({ userEmail, userName, query }) => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    _id: query,
    name: userName,
    email: userEmail,
    password: "",
  });
  const { name, email, password } = profile;

  const handleChange = (name) => (e) => {
    setProfile({ ...profile, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email !== "" && name !== "") {
        if (email !== userEmail || name !== userName) {
          const response = await axios.put(`/api/admin/update-email`, {
            profile,
          });
          console.log(response);
          sessionStorage.clear();
          sessionStorage.setItem("admin", JSON.stringify(response.data));
          // console.log('account activate response', response)
        }
        if (password !== "") {
          const response = await axios.put(`/api/admin/update-password`, {
            profile,
          });
          console.log(response);
          sessionStorage.clear();
          sessionStorage.setItem("admin", JSON.stringify(response.data));
        }
      }

      router.push("/admin-dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form autoComplete="off" className="col-6 mt-5 text-left">
      <h4>Nom de l'entreprise:</h4>
      <div>
        <input
          onChange={handleChange("name")}
          placeholder={name}
          type="text"
          className="form-control"
          required
        />
        <small id="nameHelp" className="form-text text-muted px-3">
          Renseignez le nom de votre entreprise
        </small>
      </div>
      <h4 className="mt-4">Adresse e-mail:</h4>
      <div>
        <input
          onChange={handleChange("email")}
          placeholder={email}
          type="email"
          className="form-control"
          required
        />
        <small id="emailHelp" className="form-text text-muted px-3">
          Renseignez votre nouvelle adresse e-mail
        </small>
      </div>
      <h4 className="mt-4">Mot de passe:</h4>
      <div>
        <input
          id="password1"
          placeholder="*********"
          onChange={handleChange("password")}
          type="password"
          className="form-control"
        />
        <small id="passwordHelp" className="form-text text-muted px-3">
          Renseignez votre nouveau mot de passe (8 caractères minimum)
        </small>
      </div>
      {password !== "" && password.length > 7 && (
        <div className="mt-3">
          <input
            id="password-confirm"
            readOnly={password === ""}
            placeholder="*************"
            type="password"
            className="form-control"
          />
          <small id="passwordConfirmHelp" className="form-text text-muted px-3">
            Veuillez retaper votre nouveau mot de passe
          </small>
        </div>
      )}

      <div className="mt-5">
        <button
          onClick={handleSubmit}
          className="btn btn-primary text-center w-100 py-4"
        >
          Enregistrer les modifications
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
