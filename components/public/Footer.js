import {useSelector} from 'react-redux'

const Footer = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <div className={theme==="dark"?"fixed-bottom border-top border-secondary":"fixed-bottom"}>
      <ul className="nav bg-dark text-white justify-content-center">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Accueil
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Link
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Footer;
