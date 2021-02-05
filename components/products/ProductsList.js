import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ProductNavbar from "./ProductNavbar";
import { mutate } from "swr";

const ProductsList = ({ products, categories }) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState({ categorie: "" });
  const [toUpdate, setToUpdate] = useState({
    _id: "",
    price: "",
    description: "",
    productName: "",
    stock: "",
  });
  const { productName, stock, description, price } = toUpdate;
  useEffect(() => {
    $("#exampleModal").on("show.bs.modal", function (event) {
      var button = $(event.relatedTarget); // Button that triggered the modal
      var recipient = button.data("whatever");
      setToUpdate({
        _id: recipient._id,
        productName: recipient.productName,
        stock: recipient.stock,
        price: recipient.price,
        description: recipient.description,
      });
    });
  }, []);

  const handleChange = (name) => (e) => {
    setToUpdate({ ...toUpdate, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const id = userId.user._id;
      const response = await axios.put(
        `${process.env.REST_API}/api/product/update`,
        {
          toUpdate,
        },
      );
      const { data } = await response;
      mutate(`${process.env.REST_API}/api/product/update`, data, false); // Update the local data without a revalidation

      router.reload(window.location.pathname);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-10 mt-5 pt-3 offset-2 p-0">
      <ProductNavbar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <div className="table-responsive-lg pb-4">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr className="d-flex">
              <th className="col-3">ID</th>
              <th className="col-2">Nom du produit</th>
              <th className="col-2">Prix/unité</th>
              <th className="col-2">Stock</th>
              <th className="col-3">Catégorie</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => {
                return selectedCategory.categorie === "Toutes les catégories" ? (
                  <tr
                    style={{ cursor: "pointer" }}
                    data-toggle="modal"
                    title="Modifier"
                    data-target="#exampleModal"
                    data-whatever={JSON.stringify(product)}
                    className="d-flex"
                    key={product._id}
                  >
                    <th className="col-3" style={{ fontWeight: "200" }}>
                      {product._id}
                    </th>
                    <td className="col-2" style={{ fontWeight: "600" }}>
                      {product.productName.charAt(0).toUpperCase() +
                        product.productName.slice(1)}
                    </td>
                    <td className="col-2">{product.price} €</td>
                    <td className="col-2">{product.stock}</td>
                    <td className="col-3">{product.categorie.categoryName}</td>
                  </tr>
                ) : (
                  selectedCategory.categorie === product.categorie._id && (
                    <tr
                      data-toggle="modal"
                      title="Modifier"
                      data-target="#exampleModal"
                      data-whatever={JSON.stringify(product)}
                      className="d-flex"
                      key={product._id}
                    >
                      <th className="col-3" style={{ fontWeight: "200" }}>
                        {product._id}
                      </th>
                      <td className="col-2" style={{ fontWeight: "600" }}>
                        {product.productName.charAt(0).toUpperCase() +
                          product.productName.slice(1)}
                      </td>
                      <td className="col-2">{product.price} €</td>
                      <td className="col-2">{product.stock}</td>
                      <td className="col-3">
                        {product.categorie.categoryName}
                      </td>
                    </tr>
                  )
                );
              })}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {toUpdate &&
                    toUpdate.productName.charAt(0).toUpperCase() +
                      toUpdate.productName.slice(1)}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id="updateProductForm" onSubmit={handleSubmit}>
                  {toUpdate && (
                    <>
                      <div className="form-group">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label"
                        >
                          Nom du produit:
                        </label>
                        <input
                          onChange={handleChange("productName")}
                          type="text"
                          className="form-control"
                          name="productName"
                          value={productName}
                          id="recipient-name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="description" className="col-form-label">
                          Description du produit:
                        </label>
                        <input
                          onChange={handleChange("description")}
                          type="text"
                          className="form-control"
                          name="description"
                          value={description}
                          id="description"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="stock" className="col-form-label">
                          Stock:
                        </label>
                        <input
                          onChange={handleChange("stock")}
                          type="number"
                          className="form-control"
                          name="stock"
                          value={stock}
                          id="stock"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="price" className="col-form-label">
                          Prix/unité:
                        </label>
                        <input
                          onChange={handleChange("price")}
                          type="number"
                          className="form-control"
                          name="price"
                          value={price}
                          id="price"
                        />
                      </div>
                    </>
                  )}
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  form="updateProductForm"
                  className="btn btn-primary"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
