import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {loadCards} from "../../actions/card";
import Headline from "../shared/headline";
import {Card, CardGroup, CardText, CardTitle, Col, Row} from "reactstrap";
import PreviewCard from "../card/Preview";
import BlankCard from "../card/blankCard";
import MemberBar from "./member/Bar";
import ProgressDoughnut from "./statistic/ProgressDoughnut";
import LearnForm from "../forms/Learn";
import {loadRegister} from "../../actions/register";
import {makeGetCardIdsByRegister, makeGetRoleByRegister, makeGetTagsByRegister} from "../../selectors";
import {resetResults, setSelectedSettings} from "../../actions/ui";
import {push} from "react-router-redux";

class Detail extends React.Component {
    componentWillMount() {
        const {dispatch, match, userId} = this.props;
        dispatch(loadRegister(match.params.registerId));
        dispatch(loadCards(match.params.registerId, userId));
    }

    render() {
        const {register, cardIds, match, tags, settings, role} = this.props;

        const handleSubmit = (values, dispatch) => {
            dispatch(setSelectedSettings(register.id, values.mode, values.tags));
            dispatch(resetResults());
            return dispatch(push(`/register/${match.params.registerId}/learn`));
        };

        return (
            <div>
                <Headline title={register.title}>
                    Auf dieser Seite findest du alle Informationen zum Register. In dem Bereich "Lernen" kannst Du
                    Einstellungen für das Lernen vornehmen.
                    Im unteren Bereich findest Du alle Karten, die sich im Register befinden.
                </Headline>

                <CardGroup>
                    <Card block>
                        <CardTitle>Beschreibung</CardTitle>
                        {
                            !register.description &&
                            <p className="text-muted">Keine Beschreibung vorhanden</p>
                        }
                        {
                            register.description &&
                            <p>{register.description}</p>
                        }
                        {
                            role === 'owner' &&
                            <div>
                                <span><hr/></span>
                                <Link to={`${register.id}/edit`}>Bearbeiten</Link>
                            </div>
                        }
                    </Card>

                    <Card block className="border-top-primary">
                        <CardTitle>Lernen</CardTitle>
                        <LearnForm registerId={register.id} disabled={false} tags={tags}
                                   onSubmit={handleSubmit} initialValues={settings}/>
                    </Card>

                    <Card block>
                        <CardTitle>Statistik</CardTitle>
                        <CardText>
                            <ProgressDoughnut registerId={register.id}/>
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
                <Row>
                    <BlankCard registerId={register.id}/>
                    {
                        cardIds &&
                        cardIds.map((cardId) =>
                            <PreviewCard cardId={cardId} key={cardId}/>
                        )
                    }
                </Row>
            </div>
        );
    }
}

Detail.propTypes = {};

const makeMapStateToProps = () => {
    const getCardIdsByRegister = makeGetCardIdsByRegister();
    const getTagsByRegister = makeGetTagsByRegister();
    const getRoleByRegister = makeGetRoleByRegister();
    return (state, props) => {
        const registerId = props.match.params.registerId;
        return {
            register: state.entities.registers.byId[registerId] || {},
            tags: getTagsByRegister(state, props) || [],
            settings: state.ui.learnSettings.byId[registerId] || {},
            userId: state.auth.userId,
            cardIds: getCardIdsByRegister(state, props) || [],
            role: getRoleByRegister(state, props) || '',
        }
    };
};

export default connect(makeMapStateToProps)(Detail);
