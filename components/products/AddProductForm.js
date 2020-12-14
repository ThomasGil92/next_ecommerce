import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddProductForm = ({ categories }) => {
  const router = useRouter();
  const [productFields, setProductFields] = useState({
    productName: "",
    price: "",
    description: "",
    imageUrl: "http://via.placeholder.com/290x290/ffc107/ffffff/?text=Exemple+d%27image+290x290",
    stock: "",
    categorie: "",
  });

  const {
    productName,
    price,
    description,
    stock,
    categorie,
    imageUrl,
  } = productFields;

  const handleChange = (name) => (e) => {
    setProductFields({ ...productFields, [name]: e.target.value });
  };

  const handleSelect = (e) => {
    setProductFields({ ...productFields, categorie: e.target.value });
  };
  const handleChangeImage = async (e) => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "m6o805ty");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      `https://api.Cloudinary.com/v1_1/thomas-gil-dev/image/upload`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        setProductFields({
          ...productFields,
          imageUrl: res.secure_url,
        });
      })

      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        productName !== "" &&
        price !== "" &&
        description !== "" &&
        stock !== "" &&
        categorie !== ""
      ) {
        const response = await axios.post(`/api/product/add`, {
          productFields,
        });
      }

      router.push("/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="text-center mt-5">Ajouter un produit</h2>
      {productFields && JSON.stringify(productFields)}
      <form
        className="col-6 my-5 text-left mx-auto"
        encType="multipart/form-data"
      >
        <div className="mb-2">
          <label>Nom du produit:</label>
          <input
            onChange={handleChange("productName")}
            placeholder="ex: Le petit prince"
            type="text"
            value={productName}
            className="form-control"
            required
          />
        </div>
        <hr />
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
        <hr />
        <div className="mb-2">
          <label>Description du produit:</label>
          <input
            onChange={handleChange("description")}
            placeholder="ex: Célèbre roman écrit en 1943..."
            type="text"
            value={description}
            className="form-control"
            required
          />
        </div>
        <hr />
        <div className="mb-2">
          <label>Catégorie du produit:</label>
          <select
            className="custom-select"
            value={categorie}
            onChange={handleSelect}
          >
            <option selected>Choisissez une catégorie de produits</option>
            {categories &&
              categories.categories.map((categorie) => {
                return (
                  <option key={categorie._id} value={categorie._id}>
                    {categorie.categoryName}
                  </option>
                );
              })}
          </select>
        </div>
        <hr />
        <div className="mb-2">
          <label>Prix:</label>
          <div className="flex">
            <input
              onChange={handleChange("price")}
              style={{ width: "15%" }}
              placeholder="ex: 50"
              type="number"
              value={price}
              className="form-control d-inline"
              required
            />
            <span style={{ fontSize: "1.3em", marginLeft: "10px" }}>€</span>
          </div>
        </div>
        <hr />
        <div className="mb-2">
          <label>Stock:</label>
          <div className="flex">
            <input
              onChange={handleChange("stock")}
              style={{ width: "15%" }}
              placeholder="ex: 10"
              type="number"
              value={stock}
              className="form-control"
              required
            />
          </div>
        </div>
        <hr />
        <div className="mt-5">
          <button
            onClick={handleSubmit}
            className="btn btn-primary text-center w-100 py-4"
          >
            Enregistrer ce produit
          </button>
        </div>
        {productFields && JSON.stringify(productFields)}
      </form>
    </>
  );
};

export default AddProductForm;
