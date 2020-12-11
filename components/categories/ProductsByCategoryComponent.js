const ProductsByCategoryComponent = ({ selectedCategory, products }) => {
  return (
    <div className="text-center">
      <h1>
        Liste des produits de la catégorie "{selectedCategory.categoryName}"
      </h1>
      <div className="row text-left my-5">
        {products &&
          products.products.map(
            (product) =>
              product.categorie._id === selectedCategory._id && (
                <div className="col-4 mx-auto mb-3">
                  <div className="card" style={{maxWidth:"290px"}}>
                  <img src={product.imageUrl} className="card-img-top" alt={product.productName}/>
                    <div className="card-body p-3">
                      <div className="card-title">
                        <h5>
                          {product.productName.charAt(0).toUpperCase() +
                            product.productName.slice(1)}
                        </h5>
                      </div>
                      <p className="card-text">{product.description}</p>
                    </div>
                    <div className="ml-auto">
                          <span className={product.stock<5?"text-danger":"text-success"}>Stock: {product.stock}</span>{' '}{product.stock<5?(<i className="fas fa-exclamation-triangle text-danger"></i>):""}
                    </div>
                    
                  </div>
                </div>
              ),
          )}
      </div>
    </div>
  );
};

export default ProductsByCategoryComponent;
