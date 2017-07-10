import React from "react";
import Headline from "../components/shared/headline";
import BlankCard from "../modules/registers/blankCard";
import Preview from "./register/preview";
import {Row} from "reactstrap";
import PropTypes from "prop-types";

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
                    registers.map((register) =>
                        <Preview register={register}/>
                    )
                }
            </Row>
        </div>
    );
};

Dashboard.propTypes = {
    registers: PropTypes.array.isRequired
};

export default Dashboard;
