import React from "react";
import Header from "../components/shared/headline";
import BlankCard from "../modules/registers/blankCard";
import RegisterCard from "../modules/registers/previewCard";
import {Row} from "reactstrap";

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Header
                    title="Dashboard"
                    lead="Hier hast du eine Übersicht über deine Register. Ebenfalls kannst du weitere Register erstellen."
                />

                <Row>
                    <BlankCard />
                    {/* {this.props.registers.map((register) => <RegisterCard title={register.title} members={register.members} />)} */}
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I"
                                  members={["Nicki Lauder", "Lewis", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I"
                                  members={["Nicki Lauder", "Lewis", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I"
                                  members={["Nicki Lauder", "Lewis", "Nicki Lauder"]}/>
                    <RegisterCard title="Objekt" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Mediengestaltung II"
                                  members={["Nicki Lauder", "Lewis", "Lewis", "Lewis", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I" members={["Nicki Lauder", "Lewis"]}/>
                    <RegisterCard title="Objekt Orientierte Programmierung I"
                                  members={["Nicki Lauder", "Lewis", "Nicki Lauder", "Nicki Lauder", "Nicki Lauder"]}/>
                </Row>
            </div>
        );
    }
}
export default Dashboard;
