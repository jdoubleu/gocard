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
import {
    makeGetCardIdsByRegister,
    makeGetMembershipByRegister,
    makeGetRoleByRegister,
    makeGetTagsByRegister
} from "../../selectors";
import {resetResults, setSelectedSettings} from "../../actions/ui";
import {push} from "react-router-redux";
import _ from "lodash";
import LeaveRegister from "../forms/LeaveRegister";
import {deleteMemberByRegister} from "../../actions/member";

/**
 * Detail for Register. Information of the Register. Information to all cards, statistic for all cards and overview Tags.
 */
class Detail extends React.Component {
    componentWillMount() {
        const {dispatch, userId, registerId} = this.props;
        dispatch(loadRegister(registerId));
        dispatch(loadCards(registerId, userId));
    }

    render() {
        const {register, cardIds, match, tags, settings, role, member} = this.props;


        const handleSubmit = (values, dispatch) => {
            dispatch(setSelectedSettings(register.id, values.mode, values.tags));
            dispatch(resetResults());
            return dispatch(push(`/register/${match.params.registerId}/learn`));
        };

        const handleLeaveRegister = (values, dispatch) => {
            dispatch(deleteMemberByRegister(member.register, member.id)).then(
                success =>
                    dispatch(push("/"))
            );
        };

        return (
            <div>
                <Headline title={register.title}>
                    Auf dieser Seite findest du alle Informationen zum Register. In dem Bereich "Lernen" kannst Du
                    Einstellungen für das Lernen vornehmen.
                    Im unteren Bereich findest Du alle Karten, die sich im Register befinden.
                </Headline>

                <CardGroup>
                    <Card block className="col-sm-12 col-md-4 mb-2">
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
                        <span><hr/></span>
                        <LeaveRegister onSubmit={handleLeaveRegister}/>
                    </Card>

                    <Card block className="col-sm-12 col-md-4 mb-2 border-top-primary">
                        <CardTitle>Lernen</CardTitle>
                        <LearnForm registerId={register.id} disabled={false} tags={tags}
                                   onSubmit={handleSubmit}
                                   initialValues={{...settings, tags: _.differenceWith(settings.tags, tags)}}/>
                    </Card>

                    <Card block className="col-sm-12 col-md-4 mb-2">
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
    const getMembershipByRegister = makeGetMembershipByRegister();
    return (state, props) => {
        const registerId = _.parseInt(props.match.params.registerId);
        return {
            registerId,
            register: state.entities.registers.byId[registerId] || {},
            tags: getTagsByRegister(state, props) || [],
            settings: state.ui.learnSettings.byId[registerId] || {},
            userId: state.auth.userId,
            cardIds: getCardIdsByRegister(state, props) || [],
            role: getRoleByRegister(state, props) || '',
            member: getMembershipByRegister(state, props) || {},
        }
    };
};

export default connect(makeMapStateToProps)(Detail);
