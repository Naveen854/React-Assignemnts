import { Link, withRouter } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";
import {
  NavHeader,
  NavContent,
  NavMenuItem,
  NavMenu,
  LogoutButton,
} from "./styledComponents";

const Header = (props) => {
  const onClickLogout = () => {
    const { history } = props;
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <NavHeader>
      <NavContent>
        <NavMenu>
          <NavMenuItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavMenuItem>
          <NavMenuItem>
            <Link to="/upload" className="nav-link">
              upload
            </Link>
          </NavMenuItem>
        </NavMenu>
        <LogoutButton type="button" onClick={onClickLogout}>
          Logout
        </LogoutButton>
      </NavContent>
    </NavHeader>
  );
};

export default withRouter(Header);
