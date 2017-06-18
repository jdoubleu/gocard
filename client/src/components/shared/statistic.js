import React from "react";
import PropTypes from "prop-types";
import {Doughnut} from 'react-chartjs-2';

class Statistic extends React.Component {
    render() {
        const data = {
            datasets: [{
                data: [this.props.good, this.props.middle, this.props.bad],
                backgroundColor: [
                    '#00e673',
                    '#e6b800',
                    '#e60000'
                ]
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Gut',
                'Geht so',
                'Schlecht'
            ]
        };

        const options = {
            cutoutPercentage: 80,
            legend: false
        };


        return (
            <Doughnut
                options={options}
                data={data}
            />
        );
    }
}

Statistic.propTypes = {
    good: PropTypes.number,
    middle: PropTypes.number,
    bad: PropTypes.number,


};

Statistic.defaultProps = {
    good: 20,
    middle: 75,
    bad: 85,
};


export default Statistic;
