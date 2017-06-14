import * as React from "react";
import Breadcrumb from "./Breadcrumb";
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render(){
        return (
          <div class="Header">
              <Link to="/dashboard"><img src="" alt="Home"/></Link>
              <Link to="/profile">Profil</Link>
              {/* {currentPage} */}
              <Breadcrumb />
          </div>
        );
    }
}

export default Header;
