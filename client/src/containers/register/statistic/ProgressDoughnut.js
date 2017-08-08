import React from "react";
import PropTypes from "prop-types";
import {Doughnut} from "react-chartjs-2";
import {loadAllScores} from "../../../actions/score";
import {makeGetValueArrayByRegister} from "../../../selectors/index";
import {connect} from "react-redux";

class ProgressDoughnut extends React.Component {

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

        const data = {
            datasets: [{
                data: [good, middle, bad, unanswered],
                backgroundColor: [
                    '#00e673',
                    '#e6b800',
                    '#e60000',
                    '#edecee',
                ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Gut',
                'Geht so',
                'Schlecht',
                'Unbeantwortet'
            ]
        };

        const options = {
            cutoutPercentage: 80,
            legend: false,
            maintainAspectRatio: true
        };

        return (
            <Doughnut
                options={options}
                data={data}
            />
        );
    }
}

ProgressDoughnut.propTypes = {
    progress: PropTypes.object.isRequired,
    userId: PropTypes.number,
    registerId: PropTypes.number,
};

ProgressDoughnut.defaultProps = {
    progress: {good: 0, middle: 0, bad: 0}
};

const makeMapStateToProps = () => {
    const getValueArrayByRegister = makeGetValueArrayByRegister();
    return (state, props) => {
        return {
            progress: getValueArrayByRegister(state, props) || {},
            userId: state.auth.userId
        }
    };
};

export default connect(makeMapStateToProps)(ProgressDoughnut);