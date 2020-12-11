import Link from 'next/link'
const SideBar=()=>{
    return(
        <ul className="nav flex-column col-2 bg-secondary py-3 px-0 vh-100">
  <li className="nav-item border-bottom">
      <Link href="products">
          <a className="nav-link text-white active">Produits</a>
      </Link>
    
  </li>
  <li className="nav-item border-bottom">
    <a className="nav-link text-white" href="#">Commandes</a>
  </li>
  <li className="nav-item">
    <a className="nav-link text-white" href="#">Historique</a>
  </li>
</ul>
    )
}
export default SideBar