import React from "react";
import PropTypes from "prop-types";
import {loadAllScores} from "../../../actions/score";
import {makeGetValueArrayByRegister} from "../../../selectors/index";
import {connect} from "react-redux";



class ProgressDoughnutPreview extends React.Component {

    componentDidMount() {
        const {dispatch, registerId, userId} = this.props;
        dispatch(loadAllScores(registerId, userId));
    }

    render() {
        const {progress} = this.props;

        const {good, middle, bad, unanswered} = {
            good: (progress.good || []).length,
            middle: (progress.middle || []).length,
            bad: (progress.bad || []).length,
            unanswered: (progress.unanswered || []).length,
        };

        const cards=  good + middle + bad + unanswered;
        const percentGood = (good/cards)*100;
        const percentMiddle = (middle/cards)*100;
        const percentBad = (bad/cards)*100;
        const percentUnanswered = (unanswered/cards)*100;
        const restGood = 100-percentGood;
        const restMiddle = 100-percentMiddle;
        const restBad = 100-percentBad;
        const restUnanswered = 100-percentUnanswered;
        const offSetMiddle= 125-percentGood;
        const offSetBad = offSetMiddle-percentMiddle;
        const offSetUnanswered = offSetBad-percentBad;


        return (
            <svg width="100%" height="100%" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#FFFFFF" strokeWidth="5"></circle>

                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#00e673" strokeWidth="4" strokeDasharray={`${percentGood} ${restGood}`} strokeDashoffset="25"></circle>
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e6b800" strokeWidth="4" strokeDasharray={`${percentMiddle} ${restMiddle}`} strokeDashoffset={offSetMiddle}></circle>
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e60000" strokeWidth="4" strokeDasharray={`${percentBad} ${restBad}`} strokeDashoffset={offSetBad}></circle>
                <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#edecee" strokeWidth="4" strokeDasharray={`${percentUnanswered} ${restUnanswered}`} strokeDashoffset={offSetUnanswered}></circle>
            </svg>
        );
    }
}

ProgressDoughnutPreview.propTypes = {
    progress: PropTypes.object.isRequired,
    userId: PropTypes.number,
    registerId: PropTypes.number,
};

ProgressDoughnutPreview.defaultProps = {
    progress: {good: 0, middle: 0, bad: 0}
};

const makeMapStateToProps = () => {
    const getValueArrayByRegister = makeGetValueArrayByRegister();
    return (state, props) => {
        return {
            progress: getValueArrayByRegister(state, props) || {},
        }
    };
};

export default connect(makeMapStateToProps)(ProgressDoughnutPreview);
