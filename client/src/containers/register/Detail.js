import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {loadCards} from "../../actions/card";
import Headline from "../../components/shared/headline";
import {Card, CardDeck, CardGroup, CardText, CardTitle, Col, Row} from "reactstrap";
import PreviewCard from "../card/Preview";
import BlankCard from "../../components/card/blankCard";
import MemberBar from "./member/Bar";
import Progress from "./statistic/Progress";
import LearnForm from "../forms/Learn";
import {loadRegister} from "../../actions/register";
import {makeGetCardIdsByRegister} from "../../selectors/index";

class Detail extends React.Component {
    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(loadRegister(match.params.registerId));
        dispatch(loadCards(match.params.registerId));
    }

    render() {
        const {register, cardIds} = this.props;
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
                        <Link to={`${register.id}/edit`}>Bearbeiten</Link>
                    </Card>

                    <Card block className="border-top-primary">
                        <CardTitle>Lernen</CardTitle>
                        <LearnForm />
                    </Card>

                    <Card block>
                        <CardTitle>Statistik</CardTitle>
                        <CardText>
                            <Progress registerId={register.id}/>
                        </CardText>
                        <CardTitle>Benutzer des Registers</CardTitle>
                        <CardText>
                            <MemberBar registerId={register.id}/>
                        </CardText>
                    </Card>
                </CardGroup>

                <Row className="mt-4 ml-3">
                    <Col>
                        <h4>Alle Karteikarten</h4>
                    </Col>
                </Row>
                <CardDeck>
                    <BlankCard registerId={register.id}/>
                    {
                        cardIds &&
                        cardIds.map((cardId) =>
                            <PreviewCard cardId={cardId}/>
                        )
                    }
                </CardDeck>
            </div>
        );
    }
}

Detail.propTypes = {};

const makeMapStateToProps = () => {
    const getCardIdsByRegister = makeGetCardIdsByRegister();
    const mapStateToProps = (state, props) => {
        const registerId = props.match.params.registerId;
        return {
            register: state.entities.registers.byId[registerId] || {},
            cardIds: getCardIdsByRegister(state, props)
        }
    };
    return mapStateToProps
};

export default connect(makeMapStateToProps)(Detail);
