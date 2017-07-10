import React from "react";
import Headline from "../components/shared/headline";
import BlankCard from "./register/modules/blankCard";
import Preview from "./register/preview";
import {Row} from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";

const Dashboard = ({registers}) => {
    return (
        <div>
            <Headline title="Dashboard">
                Hier hast du eine Übersicht über deine Register. Ebenfalls kannst du weitere Register erstellen.
            </Headline>

            <Row>
                <BlankCard />
                {
                    registers &&
                    _.toArray(registers).map((register) =>
                        <Preview register={register}/>
                    )
                }
            </Row>
        </div>
    );
};

Dashboard.propTypes = {
    registers: PropTypes.object.isRequired
};

export default Dashboard;
