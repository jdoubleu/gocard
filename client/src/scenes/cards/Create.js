import React from "react";
import {Button, Card, CardGroup, CardText, CardTitle, Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";

class Create extends React.Component {


      constructor(props) {
          super(props);

          this.toggle = this.toggle.bind(this);
          this.state = {
            dropdownOpen: false
          };
        }

        toggle() {
          this.setState({
            dropdownOpen: !this.state.dropdownOpen
          });
        }


      render() {
        return (
            <div>
              <h1>Neue Karteikarte erstellen</h1>
              <CardGroup>
                <Card block>
                  <CardTitle>Neue Karteikarte</CardTitle>
                  <CardText>Bitte wählen Sie den Fragetyp der Karte aus!</CardText>

                  <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                      Bitte wählen!

                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Karteikartentyp</DropdownItem>
                      <DropdownItem>Single Choice </DropdownItem>
                      <DropdownItem>Multiple Choice </DropdownItem>
                      <DropdownItem>Text Input </DropdownItem>
                      <DropdownItem>SelfValidation </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>


                  <Button color="secondary">Abbrechen</Button>

                </Card>
              </CardGroup>
            </div>
        );
    }
}



Create.defaultProps = {

}

export default Create;
