import * as React from "react";
class Footer extends React.Component {


    render(){
        const sites = [
            {link: "bullshit.html", name: "Oh its bullshit"},
            {link: "crap.html", name: "Oh its Crap"}
        ]
        const listItems = sites.map((sites) => <li><a href={sites.link}>{sites.name}</a> </li>);
        return (
            <div className="Footer">
                /*
                Hardcode implementieren !!!!
                 */

                <ul>{listItems}</ul>
            </div>

        );
    }

}
export default Footer;