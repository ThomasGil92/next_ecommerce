const CategoryHeader = ({ category }) => {
  return (
    <div
      className="container-fluid text-center mt-5 pt-5"
      style={{
        height: "300px",
        backgroundAttachment: "fixed",
        backgroundPosition:"bottom",
        backgroundImage: `url(${category.category.imageUrl})`,
        backgroundRepeat:"no-repeat"
      }}
    >
      <h2 className="col-4 mx-auto p-3 rounded" style={{backgroundColor:"rgb(255,255,255,0.7)"}}>{category.category.categoryName}</h2>
    </div>
  );
};
export default CategoryHeader;
