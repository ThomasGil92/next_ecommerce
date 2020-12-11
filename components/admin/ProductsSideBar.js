const ProductsSideBar = ({
  setShowCategories,
  showCategories,
  setSelectedCategory,
  setShowProductsList,
}) => {
  const handleCategories = (e) => {
    e.preventDefault();
    if (!showCategories) {
      setShowCategories(true);
    } else {
      setShowCategories(false);
    }
  };
  const handleProducts = (e) => {
    e.preventDefault();
      setSelectedCategory("");
    setShowProductsList(true);
  };

  return (
    <div
      className="col-2 bg-secondary position-absolute vh-100 px-0"
      style={{ top: 0,zIndex:"6" }}
    >
      <ul className="nav flex-column mt-5 pt-3">
        <li
          className={
            showCategories
              ? "nav-item border-bottom bg-primary"
              : "nav-item border-bottom"
          }
        >
          <a
            className="btn btn-link text-white active"
            onClick={handleCategories}
          >
            Catégories
          </a>
        </li>
        <li className="nav-item border-bottom">
          <a
            className="btn btn-link text-white active"
            onClick={handleProducts}
          >
            Produits
          </a>
        </li>
      </ul>
    </div>
  );
};
export default ProductsSideBar;
