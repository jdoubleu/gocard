import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import NewComponent from "../../components/register/new";
import {addRegister} from "../../actions/register";
import moment from "moment";
import {push} from "react-router-redux";

class New extends React.Component {
    render() {
        return (
            <NewComponent handleSubmit={this.handleSubmit} title={this.state.title}
                          description={this.state.description} handleInputChange={this.handleInputChange}
            />
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const {dispatch, userId} = this.props;

        dispatch(
            addRegister({
                owner: userId,
                crdate: moment().format(),
                title: this.state.title,
                description: this.state.description
            })
        ).then(
            success =>
                dispatch(push('/'))
        );
    }
}

New.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(New);
