import React from "react";
import PropTypes from "prop-types";
import {Doughnut} from "react-chartjs-2";

class Statistic extends React.Component {
    constructor(props) {
        super(props);

        this.getView = this.getView.bind(this);
    }

    getView(options, data){
        if(this.props.good === 0 && this.props.middle === 0 && this.props.bad ===0){
            return(
                <p>
                    Wenn du Karteikarten beantwortest, erhälst du deine Statistik.
                </p>
            );
        } else {
            return(
                <Doughnut
                    options={options}
                    data={data}
                />
            );
        }
    }

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
            legend: false,
            maintainAspectRatio: true
        };


        return (
            this.getView(options, data)
        );
    }
}

Statistic.propTypes = {
    good: PropTypes.number,
    middle: PropTypes.number,
    bad: PropTypes.number,


};

Statistic.defaultProps = {
    good: 0,
    middle: 0,
    bad: 0,
};


export default Statistic;
