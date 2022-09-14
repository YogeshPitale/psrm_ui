import "./Header.css";
import logo from "./wf_logo.webp";

function Header() {
  return (
    <div className="topnav">
      <img src={logo} alt="Logo" />
      <span>
        | <b>POC</b> - Position Report
      </span>
      <a href="#logout">Logout</a>
      <i className="fa fa-sign-out"></i>
    </div>
  );
}

export default Header;
