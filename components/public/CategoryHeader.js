const CategoryHeader = ({ category }) => {
  return (
    <div
      className="container-fluid text-center mt-40 category-header pt-5 px-0"
      style={{
        backgroundImage: `url(${category.category.imageUrl})`,
      }}
    >
      <h2 className="col-md-4 col-11 mx-auto p-3 rounded" style={{backgroundColor:"rgb(255,255,255,0.7)"}}>{category.category.categoryName}</h2>
    </div>
  );
};
export default CategoryHeader;
