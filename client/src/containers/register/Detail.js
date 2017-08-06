import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {loadCards} from "../../actions/card";
import Headline from "../../components/shared/headline";
import {Card, CardGroup, CardText, CardTitle, Col, Row} from "reactstrap";
import PreviewCard from "../card/Preview";
import BlankCard from "../../components/card/blankCard";
import MemberBar from "./member/Bar";
import Progress from "./statistic/Progress";
import LearnForm from "../forms/Learn";
import {loadRegister} from "../../actions/register";
import {makeGetCardIdsByRegister, makeGetTagsByRegister} from "../../selectors";
import {resetResults, setSelectedSettings} from "../../actions/ui";
import {push} from "react-router-redux";
import {loadAllScores} from "../../actions/score";


class Detail extends React.Component {
    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(loadRegister(match.params.registerId));
        dispatch(loadCards(match.params.registerId));
        //Load stats for all Cards for logged in User for current register

    }

    componentDidMount() {
        const {dispatch, match} = this.props;
        console.log("UserId", this.props.userId);
        //dispatch(loadAllScores(match.params.registerId, this.props.userId));
    }

    render() {
        const {register, cardIds, match, tags, settings} = this.props;
        const handleSubmit = (values, dispatch) => {
            dispatch(setSelectedSettings(register.id, values.mode, values.tags));
            dispatch(resetResults());
            return dispatch(push(`/register/${match.params.registerId}/learn`));
        };
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
                        <LearnForm registerId={match.params.registerId} disabled={cardIds.length === 0} tags={tags} onSubmit={handleSubmit} initialValues={settings} />
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
    const mapStateToProps = (state, props) => {
        const registerId = props.match.params.registerId;
        return {
            register: state.entities.registers.byId[registerId] || {},
            cardIds: getCardIdsByRegister(state, props),
            tags: getTagsByRegister(state, props),
            settings: state.ui.learnSettings.byId[registerId] || {},
            userId: state.auth.userId

        }
    };
    return mapStateToProps
};

export default connect(makeMapStateToProps)(Detail);
