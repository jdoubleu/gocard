import React from "react";
import Headline from "../components/shared/headline";
import BlankCard from "./register/blankCard";
import Preview from "./register/preview";
import {Row} from "reactstrap";
import PropTypes from "prop-types";
import _ from "lodash";

const Dashboard = ({registers, members}) => {
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
                        <Preview register={register} members={members[register.uid] || []} key={register.uid}/>
                    )
                }
            </Row>
        </div>
    );
};

Dashboard.propTypes = {
    registers: PropTypes.array.isRequired,
    members: PropTypes.object.isRequired
};

export default Dashboard;
