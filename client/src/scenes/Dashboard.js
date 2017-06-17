import React from "react";
import BlankCard from '../components/registers/blankCard';
import RegisterCard from '../components/registers/card';
class Dashboard extends React.Component{
    render() {
        return (
            <div>
              <BlankCard />
              {/* {this.props.registers.map((register) => <RegisterCard title={register.title} members={register.members} />)} */}
            </div>
        );
    }
}
export default Dashboard;
