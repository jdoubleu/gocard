import React from "react";
import BlankCard from '../components/registers/blankCard';
import RegisterCard from '../components/registers/card';
import { Row, CardDeck } from 'reactstrap';

class Dashboard extends React.Component{
    render() {
        return (
            <div>
              <h1>Dashboard</h1>
              <Row>
              <CardDeck>
                <BlankCard />
                {/* {this.props.registers.map((register) => <RegisterCard title={register.title} members={register.members} />)} */}
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="Objekt" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="Mediengestaltung II" members={["Nicki Lauder","Lewis","Lewis","Lewis","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
                <RegisterCard title="ObjektOrientierteProgrammierung I" members={["Nicki Lauder","Lewis"]} />
              </CardDeck>
            </Row>
            </div>
        );
    }
}
export default Dashboard;
