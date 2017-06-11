import * as React from "react";

class Header extends React.Component {


    render(){

        return (
          <div>
              <img id = "cardsLogo" src={Header.defaultProps.logo}/>
                  test
                  Zippi ist geil
              <img id = "profilePic" src={Header.defaultProps.logo}/>
          </div>
        );
    }


}
Header.defaultProps = {
    logo: "../logo.svg"
};
export default Header;