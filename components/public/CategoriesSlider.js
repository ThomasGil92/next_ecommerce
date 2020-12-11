import Link from "next/link";
const CategoriesSlider = ({ categories }) => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mx-auto mt-5 pt-5"
      data-ride="carousel"
      style={{ maxWidth: "65%" }}
    >
      <div className="carousel-inner" style={{ borderRadius: "20px" }}>
        {categories &&
          categories.categories.map((category, i) => {
            return (
              <Link href={`/categorie/${category._id}`} passHref>
                <div
                  style={{ cursor: "pointer" }}
                  key={i}
                  className={i === 0 ? "carousel-item active" : "carousel-item"}
                >
                  <img
                    src={category.imageUrl}
                    className="d-block w-100"
                    alt={category.categoryName}
                  />

                  <div className="carousel-caption mb-5 d-none d-md-block">
                    <h1
                      className="display-1 rounded"
                      style={{ backgroundColor: "rgb(0,0,0,0.6)" }}
                    >
                      {category.categoryName}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          style={{ filter: "invert(100%)" }}
          aria-hidden="true"
        ></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          style={{ filter: "invert(100%)" }}
          aria-hidden="true"
        ></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default CategoriesSlider;
