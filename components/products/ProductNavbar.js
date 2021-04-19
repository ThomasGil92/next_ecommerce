import Link from "next/link";

const ProductNavbar = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
    const handleSelect = (e) => {
        setSelectedCategory({ ...selectedCategory, categorie: e.target.value });
      };
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="mr-auto w-25 d-flex align-items-center">
        <span className="mr-2">Filtrer par catégorie</span>
        <select className="custom-select" onChange={handleSelect}>
          <option selected value="Toutes les catégories">Toutes les catégories</option>
          {categories &&
            categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              );
            })}
        </select>
      </div>
      <ul className="navbar-nav ml-auto">
        <li style={{ zIndex: "1" }} className="nav-item active">
          <Link style={{ cursor: "pointer" }} href="/products/add-product">
            <a className="nav-link">
              <i className="fas fa-plus-square"></i> Ajouter un produit
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default ProductNavbar;
