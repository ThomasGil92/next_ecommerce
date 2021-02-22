import { useSelector } from "react-redux";

const ProductsByCategoryComponent = ({ selectedCategory, products }) => {
  const theme = useSelector((state) => state.theme);
  return (
    <div className="text-center pt-5">
      <h1 className={theme==="dark"?"text-light":"text-dark"}>
        Liste des produits de la catégorie "{selectedCategory.categoryName}"
      </h1>
      <div className="row text-left mt-5 pb-40 px-4">
        {products.length > 0 ? (
          products.map(
            (product,i) =>
              product.categorie._id === selectedCategory._id && (
                <div key={i} className="col-4 mb-3">
                  <div
                    className="card"
                    className={
                      theme === "dark"
                        ? "bg-dark text-white border rounded border-warning"
                        : "bg-white text-dark "
                    }
                    style={{ maxWidth: "290px" }}
                  >
                    <img
                      src={product.imageUrl}
                      className="card-img-top"
                      alt={product.productName}
                    />
                    <div className="card-body p-3">
                      <div className="card-title">
                        <h5>
                          {product.productName.charAt(0).toUpperCase() +
                            product.productName.slice(1)}
                        </h5>
                      </div>
                      <p className="card-text">{product.description}</p>
                    </div>
                    <div className="ml-auto p-1">
                      <span
                        className={
                          product.stock < 5 ? "text-danger" : "text-success"
                        }
                      >
                        Stock: {product.stock}
                      </span>{" "}
                      {product.stock < 5 ? (
                        <i className="fas fa-exclamation-triangle text-danger"></i>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ),
          )
        ) : (
          <div className="mx-auto h3">
            Aucun produit enregistré pour le moment
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsByCategoryComponent;
