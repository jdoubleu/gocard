import React from "react";
import Icon from '../../shared/user/icon';
import NumberIcon from '../../shared/user/numberIcon';
import PropTypes from "prop-types";

class IconBar extends React.Component {
  constructor(props) {
      super(props);

      this.calculateIcon = this.calculateIcon.bind(this);
  }

    calculateIcon(){
      let view = this.props.members.slice(0, this.props.maxIcons-1).map((members)=>
      <span className="pr-1">
        <Icon name={members}/>
      </span>)
      if(this.props.members.length > this.props.maxIcons) {
        let rest = this.props.members.length - this.props.maxIcons+1;
        if(rest > 99)
          rest = 99
        view.push(
          <NumberIcon rest={rest} />
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
    members: PropTypes.array.isRequired,
    maxIcons: PropTypes.number.isRequired,
};

IconBar.defaultProps = {
    maxIcons: 5
};

export default IconBar;
