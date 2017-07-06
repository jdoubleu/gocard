import React from "react";
import "./Detail.css";
import Header from "../../components/shared/headline";
import {
  Button,
  ButtonGroup,
  Card,
  CardDeck,
  CardGroup,
  CardText,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import {Link} from "react-router-dom";
import Statistic from "../../modules/shared/statistic";
import PreviewCard from "../../modules/cards/previewCard";
import MemberBar from "../../components/register/member/bar";
import TagViewer from "../../modules/registers/tagViewer";
import BlankPreviewCard from "../../modules/cards/blankPreviewCard";

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.start = this.start.bind(this);
  }

  onRadioBtnClick(mode) {
    this.setState({mode});
  }

  start() {
    if (this.state.mode === 1) {
      return "/normal";
    } else if (this.state.mode === 2) {
      return "/power";
    } else {
      return "/exam";
    }
  }

  render() {
    return (
      <div>
        <Header title="Objektorientierte Programmierung"/>

        <CardGroup>
          <Card block>
            <CardTitle>Beschreibung</CardTitle>
            <CardText>OOP Register: Hier liegt alles zum Modul OOP1 von Prof. Dahm
              <hr/>
            </CardText>

            <CardText>
              <Link to="3/edit">Bearbeiten</Link>
            </CardText>

          </Card>
          <Card block className="border-top-primary">

            <CardTitle>Lernen</CardTitle>
            <Form>
              <FormGroup>
                <Label for="tags" id="labelTags">Tags</Label>
                <TagViewer/>
              </FormGroup>
              <FormGroup>
                <Label for="mode" id="labelLernmodus" width="80px">Lernmodus</Label>
                <ButtonGroup check>
                  <Link to="/normal">
                    <Button id="buttonNormal" outline
                      onClick={() => this.onRadioBtnClick(1)} active={this.state.mode === 1} color={this.state.mode === 1 ? 'primary' : 'secondary'}>Normal
                    </Button>
                  </Link>

                  <Button id="buttonPower" outline
                    onClick={() => this.onRadioBtnClick(2)} active={this.state.mode === 2} color={this.state.mode === 2 ? 'primary' : 'secondary'}>Power
                  </Button>
                  <Button id="buttonKlausur" outline
                    onClick={() => this.onRadioBtnClick(3)} active={this.state.mode === 3} color={this.state.mode === 3 ? 'primary': 'secondary'}>Klausur
                  </Button>
                </ButtonGroup>
              </FormGroup>
              <Link to={this.start()}>
                <Button block outline color="primary">Lernen starten</Button>
              </Link>
            </Form>
          </Card>
          <Card block>
            <CardTitle>Statistik</CardTitle>
            <CardText>
              <Statistic/>
            </CardText>
            <CardTitle >Benutzer des Registers</CardTitle>
            <CardText>
              <MemberBar members={["Lewis","nicki lauder","peter maffay","Udo","Dimo Bibbers","Ingo Dingo","Tarzan","Balu Bär"]}/>
            </CardText>
          </Card>
        </CardGroup>
        <Row className="mt-4 ml-3">
          <Col>
            <h4>Alle Karteikarten</h4>
          </Col>
        </Row>
        <CardDeck>
          <BlankPreviewCard/>
          <PreviewCard question="Wie traversiert man durch einen Baum?"/>
          <PreviewCard question="Wie traversiert man durch einen Baum?"/>
          <PreviewCard question="Wie traversiert man durch einen Baum?"/>
          <PreviewCard question="Wie traversiert man durch einen Baum?"/>
          <PreviewCard question="Wie traversiert man durch einen Baum?"/>
          <PreviewCard question="Wie traversiert man durch einen Baum?"/>
          <PreviewCard question="Wie traversiert man durch einen Baum?"/>

        </CardDeck>

        {/* there are some tooltips for the user information, called via id */}
        <UncontrolledTooltip placement="right" target="labelTags">
          Die Tags können ausgewählt werden, um themenbezogene Lernkarten zu erhalten. Sie können einen oder mehrere Tags auswählen um das Lernen zu starten. Wenn Tags nicht ausgewählt sind, werden diese nicht im Lernmodus berücksichtigt.
        </UncontrolledTooltip>
        <UncontrolledTooltip placement="right" target="labelLernmodus">
          Der Lernmodus muss ausgwählt werden, um die Variante des Lernens zu definieren. {/*  {<span> <br /> </span>} Normalmodus: Wir gehen nach und nach durch die alle Karteikarten mit den themenbezogenen Tags und fragen diese ab.*/}
        </UncontrolledTooltip>

      </div>
    );
  }

}

export default Detail;
