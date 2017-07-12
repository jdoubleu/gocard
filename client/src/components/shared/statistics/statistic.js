import React from "react";
import PropTypes from "prop-types";
import {Doughnut} from "react-chartjs-2";

const statistic = ({good, middle, bad}) => {

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

    return (
        <div>
            {
                (good !== 0 || bad !== 0 || middle !== 0) &&
                <Doughnut
                    options={options}
                    data={data}
                />
            }
            {
                good === 0 && bad === 0 && middle === 0 &&
                <p>
                    Wenn du Karteikarten beantwortest, erhälst du deine Statistik.
                </p>
            }
        </div>
    );
};

statistic.propTypes = {
    good: PropTypes.number,
    middle: PropTypes.number,
    bad: PropTypes.number,
};

statistic.defaultProps = {
    good: 0,
    middle: 0,
    bad: 0,
};


export default statistic;
