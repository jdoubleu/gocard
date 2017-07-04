import React from "react";
import Icon from "../../shared/user/icon";
import NumberIcon from "../../shared/user/numberIcon";
import PropTypes from "prop-types";
import {UncontrolledTooltip} from "reactstrap";

class IconBar extends React.Component {
  constructor(props) {
    super(props);

    this.calculateIcon = this.calculateIcon.bind(this);
  }

  calculateIcon() {
    let view = this.props.members.slice(0, this.props.maxIcons - 1).map((members) => <span id={"ID" + members}>
      <Icon name={members} diameter={this.props.diameter}/>
      <UncontrolledTooltip placement="bottom" target={"ID" + members} delay={0}>
        {members}
      </UncontrolledTooltip>
    </span>)

    if (this.props.members.length > this.props.maxIcons) {
      let rest = this.props.members.length - this.props.maxIcons + 1;
      let restMember = this.props.members.slice(this.props.maxIcons - 1, this.props.members.length).map(name => <span>{name}<br/></span>);

      if (rest > 99)
        rest = 99
      view.push(
        <span id="additionalMembers">
          <NumberIcon rest={rest} diameter={this.props.diameter}/>
          <UncontrolledTooltip placement="bottom" target="additionalMembers" delay={0}>
            {restMember}
          </UncontrolledTooltip>
        </span>
      )
    }
    return view;
  };

  render() {
    return (
      <span>
        {this.calculateIcon()}
      </span>
    );
  }
}

IconBar.propTypes = {
  diameter: PropTypes.number,
  members: PropTypes.array.isRequired,
  maxIcons: PropTypes.number
};

IconBar.defaultProps = {
  maxIcons: 5,
  diameter: 40
};

export default IconBar;
