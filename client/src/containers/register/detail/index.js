import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {loadCards} from "../../../actions/card";
import {loadMembers} from "../../../actions/member";
import "./Detail.css";
import Headline from "../../../components/shared/headline";
import {Card, CardDeck, CardGroup, CardText, CardTitle, Col, Row} from "reactstrap";
import PreviewCard from "../../card/Preview";
import BlankCard from "../../../components/card/blankCard";
import MemberBar from "../member/Bar";
import Progress from "../statistics/Progress";
import LearnForm from "../../forms/Learn";

class Detail extends React.Component {
    render() {
        const {cards, members, register} = this.props;
        return (
            <div>
                <Headline title={register.title}/>

                <CardGroup>
                    <Card block>
                        <CardTitle>Beschreibung</CardTitle>
                        <CardText>
                            {register.description}
                        </CardText>
                        <span><hr/></span>
                        <Link to={`${register.uid}/edit`}>Bearbeiten</Link>
                    </Card>

                    <Card block className="border-top-primary">
                        <CardTitle>Lernen</CardTitle>
                        <LearnForm />
                    </Card>

                    <Card block>
                        <CardTitle>Statistik</CardTitle>
                        <CardText>
                            <Progress registerId={register.uid}/>
                        </CardText>
                        <CardTitle>Benutzer des Registers</CardTitle>
                        <CardText>
                            <MemberBar members={members}/>
                        </CardText>
                    </Card>
                </CardGroup>

                <Row className="mt-4 ml-3">
                    <Col>
                        <h4>Alle Karteikarten</h4>
                    </Col>
                </Row>
                <CardDeck>
                    <BlankCard/>
                    {
                        cards &&
                        cards.map((card) =>
                            <PreviewCard card={card}/>
                        )
                    }
                </CardDeck>
            </div>
        );
    }

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(loadMembers(match.params.id));
        dispatch(loadCards(match.params.id));
    }
}

Detail.propTypes = {};

function mapStateToProps(state, ownProps) {
    const registerId = ownProps.match.params.id;
    return {
        register: state.entities.registers.byId[registerId],
        cardIds: state.entities.cards.allIds
    }
}

export default connect(mapStateToProps)(Detail);
