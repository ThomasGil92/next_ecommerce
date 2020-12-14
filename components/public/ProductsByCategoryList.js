import { useRouter } from "next/router";
const PublicProductList = ({ products }) => {
  const router = useRouter();
  const categoryId = router.query.id;
  return (
    <div className="mt-5 mx-0 text-center bg-third">
      <div className="container-fluid">
        <div className="row mx-0 mt-4">
          {products &&
            products.products.map((product, i) => {
              return (
                product.categorie._id === categoryId && (
                  <div key={i} className="col-md-3">
                    <div
                      className="card mx-auto my-3"
                      style={{ maxWidth: "290px", borderRadius: "15px" }}
                    >
                      <img
                        src={product.imageUrl}
                        className="card-img-top"
                        alt={product.productName}
                        style={{
                          borderTopRightRadius: "15px",
                          borderTopLeftRadius: "15px",
                        }}
                      />
                      <div className="card-body text-left p-2">
                        <h5 className="card-title">
                          {product.productName.charAt(0).toUpperCase() +
                            product.productName.slice(1)}
                        </h5>
                        <div className="row m-0">
                          <div className="col-md-6 px-0 d-flex align-items-center">
                            {product.price} €
                          </div>
                          <div className="col-md-6 px-0">
                            <button
                              className="btn btn-warning py-1"
                              style={{ lineHeight: "0.8" }}
                            >
                              Ajouter au panier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PublicProductList;
