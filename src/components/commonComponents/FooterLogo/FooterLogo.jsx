import { Link } from "react-router-dom";
import styles from "./FooterLogo.module.css";
import logoImage from "../../../images/cactus.png";
import PropTypes from "prop-types";

const Logo = ({ variant = "default" }) => {
    return (
        <Link
            className={`${styles.logo} ${styles[variant] || styles.default}`}
            to="/">
            <img src={logoImage} alt="Logo" />
            <span>TaskPro</span>
        </Link>
    );
};

Logo.propTypes = {
    variant: PropTypes.string,
};

export default Logo;
