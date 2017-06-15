import React from "react";
import Icon from '../components/shared/user/icon'
class Dashboard extends React.Component{
    render() {
        return (
            <div>
              <Icon name="Dimo Bibbers"/>
              <Icon name="Wdo Wibbers"/>
              <Icon name="albert Bibbers"/>
              <Icon name="hans Bibbers"/>
              <svg class="donut">
  <circle class="donut-hole" cx="21" cy="21" r="15.91549430918954" fill="#fff"></circle>
  <circle class="donut-ring" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#d2d3d4" strokeWidth="3"></circle>

  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#ce4b99" strokeWidth="3" strokeDasharray="40 60" strokeDashoffset="25"></circle>
  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#b1c94e" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="85"></circle>
  <circle class="donut-segment" cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#377bbc" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="65"></circle>
</svg>
            </div>
        );
    }
}
export default Dashboard;
