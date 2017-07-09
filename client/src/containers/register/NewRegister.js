import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import NewRegisterComponent from "../../components/register/newRegister";
import {addRegister} from "../../actions/registers";


class NewRegister extends React.Component {
    render() {
        return (
            // handle this!
            <NewRegisterComponent handleSubmit={this.handleSubmit} title={this.state.title} description={this.state.description} handleInputChange={this.handleInputChange}/>
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

      this.props.dispatch(addRegister({
          body: {
            owner: this.props.user.uid,
            crdate: new Date().toISOString(),
            title: this.state.title,
            description: this.state.description
          }
        })
      )
    }
}

NewRegister.propTypes = {
    user: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps)(NewRegister);
