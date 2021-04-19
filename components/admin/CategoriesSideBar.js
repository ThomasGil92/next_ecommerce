import { motion } from "framer-motion";
import Link from "next/link";

const CategoriesSideBar = ({setShowProductsList, showCategories,setShowCategories,setSelectedCategory, categories }) => {

const handleClick=category=>e=>{
  e.preventDefault()
  setShowCategories(false)
  setShowProductsList(false)
  setSelectedCategory(category)
}

  return (
    <motion.div
      className="col-2 bg-primary position-absolute px-0 vh-100"
      initial={{ left: 0 }}
      animate={{ left: showCategories ? "16.666667%" : "0" }}
      transition={{ damping: 0, duration: 0.1 }}
      style={{
        /* left:showCategories?"16.666667%":"0", */ zIndex: "5",
        top: "0",
      }}
    >
      <ul className="nav flex-column border-left mt-5 pt-3">
        <li className="nav-item border-bottom">
          <Link href="/categories/add">
            <a className="nav-link text-white active">
              <i className="fas fa-plus-square"></i> Ajouter une catégorie
            </a>
          </Link>
        </li>
        {/* {categories && JSON.stringify(categories)} */}
        {categories && categories.map((category) => {
            return (
              <li key={category._id} className="nav-item border-bottom">
                <a onClick={handleClick(category)} id={category._id} className="nav-link text-white active">{category.categoryName}</a>
              </li>
            );
          })}
      </ul>
    </motion.div>
  );
};

export default CategoriesSideBar;
