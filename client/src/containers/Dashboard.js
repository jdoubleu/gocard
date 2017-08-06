import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadRegisters} from "../actions/register";
import Headline from "./shared/headline";
import {Row} from "reactstrap";
import BlankCard from "./register/blankCard";
import Preview from "./register/Preview";
import {makeGetRegisterIds} from "../selectors/index";
import {loadMembershipsByUser} from "../actions/member";

class Dashboard extends React.Component {
    componentWillMount() {
        const {dispatch, userId} = this.props;
        dispatch(loadMembershipsByUser(userId));
        dispatch(loadRegisters());
    }

    render() {
        const {registersIds} = this.props;
        return (
            <div>
                <Headline title="Dashboard">
                    Hier hast du eine Übersicht über deine Register. Ebenfalls kannst du weitere Register erstellen.
                </Headline>

                <Row>
                    <BlankCard/>
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
    registersIds: PropTypes.array.isRequired
};

const makeMapStateToProps = () => {
    const getRegisterIds = makeGetRegisterIds();
    return (state, props) => {
        return {
            userId: state.auth.userId,
            registersIds: getRegisterIds(state, props)
        }
    };
};

export default connect(makeMapStateToProps)(Dashboard);