import "./Footer.css";
import logo from "./WellsFargoLogo.png";

function Footer() {
  return (
    <div className="footer">
      <img src={logo} alt="WF Logo"></img>
      <p>&#169; 2022 Wells Fargo Inc &nbsp; All Rights Reserved</p>
    </div>
  );
}

export default Footer;
