import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {updateUser} from "../../actions/auth";
import InitialDialogComponent from "../../components/account/initialDialog";

class InitialDialog extends React.Component {
    render() {
        return (
            <InitialDialogComponent handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange}
                                    modal={this.state.modal} modalToggle={this.modalToggle}
                                    modalHandleSubmit={this.modalHandleSubmit} isFetching={false}
            />
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            displayName: props.user.displayName,
            modal: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.modalToggle = this.modalToggle.bind(this);
        this.modalHandleSubmit = this.modalHandleSubmit.bind(this);
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

        this.props.dispatch(updateUser({
            "displayName": this.state.displayName,
            "status": "active",
        }));
    }

    modalToggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    modalHandleSubmit(event) {
        event.preventDefault();
        console.log("DELETE USER");
    }
}

InitialDialog.propTypes = {
    user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(InitialDialog);
