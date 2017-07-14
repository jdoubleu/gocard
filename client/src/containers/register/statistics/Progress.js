import React from "react";
import PropTypes from "prop-types";
import {Doughnut} from "react-chartjs-2";

const Progress = ({good, middle, bad}) => {

    const data = {
        datasets: [{
            data: [good, middle, bad],
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
        legend: false,
        maintainAspectRatio: true
    };

    if (good !== 0 || bad !== 0 || middle !== 0) {
        return (
            <Doughnut
                options={options}
                data={data}
            />
        );
    } else {
        return (
            <span>
                Wenn du Karteikarten beantwortest, erhälst du deine Statistik.
            </span>
        );
    }
};

Progress.propTypes = {
    good: PropTypes.number,
    middle: PropTypes.number,
    bad: PropTypes.number,
};

Progress.defaultProps = {
    good: 0,
    middle: 0,
    bad: 0,
};


export default Progress;
