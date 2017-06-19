import React from "react";
import BlankCard from "../components/registers/blankCard";
import RegisterCard from "../components/registers/previewCard";
import {Row} from "reactstrap";

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <div className="m-3">
                    <h1>Dashboard</h1>
                    <i>Beschreibung</i>
                </div>
                <Row>
                    <BlankCard />
                    {/* {this.props.registers.map((register) => <RegisterCard title={register.title} members={register.members} />)} */}
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis", "Nicki Lauder"]}/>
                    <RegisterCard title="Objekt" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Mediengestaltung II"
                                  members={["Nicki Lauder", "Lewis", "Lewis", "Lewis", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder"]}/>
                </Row>
            </div>
        );
    }
}
export default Dashboard;
