import React from "react";
import {Link, Route} from "react-router-dom";
import {Breadcrumb as BreadcrumbComponent, BreadcrumbItem} from "reactstrap";

import "./breadcrumb.css";
/**
 * Breadcrum that creates a path the user took to get to the current site
 */
const routes = {
    'Dashboard': /^\/$/,
    'Registieren': /^\/registration$/,
    'Passwort zurücksetzten': /^\/reset$/,
    'Einstellungen': /^\/settings/,
    'Hilfe': /^\/legal\/help/,
    'EULA': /^\/legal\/eula/,
    'Datenschutzerklärung': /^\/legal\/privacy-policy/,
    'Impressum': /^\/legal\/imprint/,
    'Lizenz': /^\/legal\/license/,
    'Register': /^\/register\/[^/]+?$/,
    'Neues Register': /^\/register\/new$/,
    'Neue Karteikarte': /\/register\/\S+\/card\/new/,
    'Bearbeiten': /^\/register\/.*\/edit$/,
    'Karteikarte': /\/register\/\S+\/card\/[^/]+?$/,
    'Lernen': /\/register\/\S+\/learn$/,
};

const findRouteName = url => {
    for (let key in routes) {
        if (url.match(routes[key]) !== null)
            return key;
    }
};

const getPaths = (pathname) => {
    const paths = ['/'];

    if (pathname === '/') return [];

    pathname.split('/').reduce((prev, curr, index) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });

    return paths;
};

const BreadcrumbsItem = ({...rest, match}) => {
    const routeName = findRouteName(match.url);
    if (routeName) {
        return (
            match.isExact ?
                (
                    <BreadcrumbItem active>{routeName}</BreadcrumbItem>
                ) :
                (
                    <BreadcrumbItem>
                        <Link to={match.url || ''}>
                            {routeName}
                        </Link>
                    </BreadcrumbItem>
                )
        );
    }
    return null;
};

const Breadcrumb = ({...rest, location: {pathname}}) => {
    const paths = getPaths(pathname);
    return (
        <BreadcrumbComponent className="m-0 p-0">
            {paths.map(p => <Route path={p} component={BreadcrumbsItem} key={p} {...rest}/>)}
        </BreadcrumbComponent>
    );
};

export default Breadcrumb;