import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteUser, updateUser} from "../../actions/user";
import InitialDialogComponent from "../../components/account/initialDialog";

class InitialDialog extends React.Component {
    render() {
        return (
            <InitialDialogComponent handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange}
                                    modal={this.state.modal} modalToggle={this.modalToggle}
                                    modalHandleSubmit={this.modalHandleSubmit} isFetching={this.props.isFetching}
                                    displayName={this.state.displayName}
            />
        );
    }

    constructor(props) {
        super(props);

        this.state = {
            displayName: props.user.displayName || props.user.email.split('@')[0],
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
        this.props.dispatch(deleteUser(this.props.user.id));
    }
}

InitialDialog.propTypes = {
    user: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.entities.users.byId[state.auth.userId] || {},
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps)(InitialDialog);
