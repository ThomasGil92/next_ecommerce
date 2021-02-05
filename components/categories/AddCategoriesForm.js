import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddCategoriesForm = () => {
  const router = useRouter();
  const [categorieFields, setCategorieFields] = useState({
    categoryName: "",
    imageUrl: "https://picsum.photos/1300/400",
  });

  const { categoryName, imageUrl } = categorieFields;

  const handleChange = (name) => (e) => {
    setCategorieFields({ ...categorieFields, [name]: e.target.value });
  };

  const handleChangeImage = async (e) => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "hvkoya2u");
    const options = {
      method: "POST",
      body: formData,
    };
    return fetch(
      `https://api.Cloudinary.com/v1_1/thomas-gil-dev/image/upload`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        setCategorieFields({
          ...categorieFields,
          imageUrl: res.secure_url,
        });
      })

      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoryName !== "") {
        const response = await axios.post(
          `${process.env.REST_API}/api/categorie/add`,
          {
            categorieFields,
          },
        );
        console.log(response);
      }

      router.push("/admin-dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="col-6 mt-5 pt-5 text-left mx-auto">
      <h4>Ajouter une catégorie de produits</h4>
      <div>
        <input
          onChange={handleChange("categoryName")}
          placeholder="ex: livres"
          type="text"
          value={categoryName}
          className="form-control"
          required
        />
      </div>
      <div className="mb-2">
        <label>Photo du produit:</label>
        <input
          onChange={handleChangeImage}
          placeholder="Sélectionnez une image"
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
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
export default AddCategoriesForm;
