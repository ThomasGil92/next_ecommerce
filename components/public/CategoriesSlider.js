import Link from "next/link";

const CategoriesSlider = ({ categories }) => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide mx-auto mt-40 mt-md-5 pt-md-5 h-100"
      data-ride="carousel"
    >
      <div className="carousel-inner">
        {categories &&
          categories.map((category, i) => {
            return (
              <Link key={i} href={`/categorie/${category._id}`} passHref>
                <div
                  style={{ cursor: "pointer" }}
                  className={i === 0 ? "carousel-item active" : "carousel-item"}
                >
                  <img
                    src={category.imageUrl}
                    className="d-block w-100 lazyload"
                    alt={category.categoryName}
                  />

                  <div className="carousel-caption" style={{top:"40%"}}>
                    <h1
                      className="rounded"
                      style={{ backgroundColor: "rgb(0,0,0,0.6)" }}
                    >
                      {category.categoryName}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })}
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
    </div>
  );
};

export default CategoriesSlider;
