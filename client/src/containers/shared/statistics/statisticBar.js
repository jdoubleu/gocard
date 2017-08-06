import React from "react";
import PropTypes from "prop-types";
import {Bar} from "react-chartjs-2";

class StatisticBar extends React.Component {
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
            legend: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        };


        return (
            <Bar
                options={options}
                data={data}
            />
        );
    }
}

StatisticBar.propTypes = {
    good: PropTypes.number,
    middle: PropTypes.number,
    bad: PropTypes.number,


};

StatisticBar.defaultProps = {
    good: 40,
    middle: 175,
    bad: 85,
};


export default StatisticBar;