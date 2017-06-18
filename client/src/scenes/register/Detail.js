import React, {Component} from 'react';
import Icon from '../../components/shared/user/icon';
import BlankCard from '../../components/registers/blankCard';
//import Card from '../../components/registers/card';
import { Button, ButtonGroup, Card, CardGroup, CardTitle, CardText  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Statistic from "../../components/shared/statistic";

class Detail extends Component{
    constructor (props) {
        super(props);
        this.state = { mode: [] };
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(mode) {
        this.setState({ mode });
    }

    render() {
        return (
            <div>
              <h2>Register Detailansicht</h2>
              {/*<h2>{this.props.register.title}</h2>*/}
              <CardGroup>
                <Card block>
                  <CardTitle>Beschreibung</CardTitle>
                  <CardText>Lorem ipsum si amet</CardText>
                  <CardTitle>Bearbeiten</CardTitle>
                  <CardText><Link to="+">Bearbeiten</Link></CardText>
                </Card>
                <Card block>
                  <CardTitle>Lernen</CardTitle>
                  <CardText>Tags</CardText>
                  <CardTitle>Lernmodus</CardTitle>
                  <CardText>
                    <ButtonGroup check>
                      <Button color="secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.mode === 1}>Normal</Button>
                      <Button color="secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.mode === 2}>Power</Button>
                      <Button color="secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.mode === 3}>Klausur</Button>
                    </ButtonGroup>
                  </CardText>
                  <Button  outline color="primary">Lernen starten</Button>
                </Card>
                <Card block>
                  <CardTitle>Statistik</CardTitle>
                  <CardText><Statistic /></CardText>
                  <CardTitle>Benutzer des Registers</CardTitle>
                  <CardText>
                    <span className="pr-1"><Icon name="Peter Maffay"/></span>
                    <span className="pr-1"><Icon name="tabaluga"/></span>
                    <span className="pr-1"><Icon name="Nicki Lauder"/></span>
                    <span className="pr-1"><Icon name="Lewis"/></span>
                  </CardText>
                </Card>
              </CardGroup>
            </div>


        );
    }

}

export default Detail;
