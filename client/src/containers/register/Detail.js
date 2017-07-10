import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import DetailComponent from "../../components/register/detail";
import {addRegister} from "../../actions/registers";


class Detail extends React.Component {
    render() {
        return (
            <DetailComponent cards="" mode={this.state.mode} members="" register="" handleSubmit={this.handleSubmit} modeSelected={this.modeSelected()}/>
        );
    }

    modeSelected(mode){
        this.setState({
            mode
        });
    }

    componentWillMount(){
    //this.props.dispatch(getCards);
    //this.props.dispatch(getMembers);
    }

    constructor(props) {
        super(props);

        this.state = {
            mode: 1,
            description: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.modeSelected = this.modeSelected.bind(this);
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

    }
}

Detail.propTypes = {
    user: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        register: state.auth.user,
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps)(Detail);
