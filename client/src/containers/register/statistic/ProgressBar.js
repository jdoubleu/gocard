import React from "react";
import PropTypes from "prop-types";
import {Bar} from "react-chartjs-2";

const ProgressBar = ({good, middle, bad, unanswered}) => {

    const data = {
        datasets: [{
            data: [good, middle, bad, unanswered],
            backgroundColor: [
                '#00e673',
                '#e6b800',
                '#e60000',
                '#edecee'
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
    )
};

ProgressBar.propTypes = {
    good: PropTypes.number,
    middle: PropTypes.number,
    bad: PropTypes.number,
};

ProgressBar.defaultProps = {
    good: 0,
    middle: 0,
    bad: 0,
};


export default ProgressBar;
