import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadRegisters} from "../actions/register";
import Headline from "../components/shared/headline";
import {Row} from "reactstrap";
import BlankCard from "../components/register/blankCard";
import Preview from "./register/Preview";

class Dashboard extends React.Component {
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(loadRegisters())
    }

    render() {
        const {registersIds} = this.props;
        return (
            <div>
                <Headline title="Dashboard">
                    Hier hast du eine Übersicht über deine Register. Ebenfalls kannst du weitere Register erstellen.
                </Headline>

                <Row>
                    <BlankCard />
                    {
                        registersIds &&
                        registersIds.map((registerId) =>
                            <Preview registerId={registerId} key={registerId}/>
                        )
                    }
                </Row>
            </div>
        )
    }
}

Dashboard.propTypes = {
    dispatch: PropTypes.func.isRequired,
    registers: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        registersIds: state.entities.registers.allIds || [],
    }
}

export default connect(mapStateToProps)(Dashboard);