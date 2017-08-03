import React from "react";
import Headline from "../shared/headline";
import {Button, Media,Table, Card, CardBlock, CardHeader, CardText, CardTitle, Col, NavLink, Row} from "reactstrap";
import "./help.css";

const Help = () => {
    return (
        <div id="top" className="help">

            <Headline title="Hilfe"/>

            <Row>


                <Col md="2" sm="2" xs="2">


                    <Card id="fixedCard" className="mr-1">

                        <CardHeader>

                            <NavLink href="#card">Karteikarten</NavLink>
                            <NavLink href="#register">Register</NavLink>
                            <NavLink href="#learn">Lernen</NavLink>
                            <NavLink href="#account">Account</NavLink>
                            <NavLink href="#special">Sonstiges</NavLink>
                            <NavLink href="#processes">Abläufe</NavLink>
                        </CardHeader>

                        <NavLink href="#top">nach oben</NavLink>

                    </Card>
                </Col>

                <Col>
                    <Card>
                        <CardBlock>
                            <CardTitle id="card">Häufig gestellte Fragen</CardTitle>

                            <CardText className="px-2 mb-5 text-justify">
                                <Button className="m-1" outline color="primary" type="button">
                                    <NavLink href="#card">Was ist ein Register?</NavLink>
                                </Button>
                                <Button className="m-1" outline color="primary" type="button">
                                    <NavLink href="#card">Wie erstelle ich ein Register?</NavLink>
                                </Button>
                                <Button className="m-1" outline color="primary" type="button">
                                    <NavLink href="#card">Wo finde ich meine Einstellungen?</NavLink>
                                </Button>
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="card" className="">Karteikarten</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Was ist eine Karteikarte?</CardTitle>

                            <CardText className="px-2 text-justify">

                                Eine Karteikarte ist ein Medium zum Lernen. Dieses Medium ist meist ein zweiseitige Karte,
                                wobei die Vorderseite mit einem Thema bzw. einer Frage ausgestattet wird. Die Rückseite ist dann mit der richtigen Antwort versehen.
                                Bei GoGrad ist eine Karteikarte genau auf diese Weise umgesetzt. Du erstellst ein Karteikarte und gibst dazu die richtige Antwort.
                                Dies kannst du dann beliebig wiederholen, so wie du magst. Bei uns gibt vier Kartentypen die man auswählen kann.
                            </CardText>
                            <CardText className="px-2">
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Kartentyp</th>
                                        <th>Beschreibung</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Single Choice</td>
                                        <td>Es gibt mehrere Antwortmöglichkeiten, aber nur eine Antwort ist die Richtige</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Multiple Choice</td>
                                        <td>Es gibt mehrere Antwortmöglichkeiten und es können eine oder mehrere richtig Antworten zur Frage passen</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Selbstkontrolle</td>
                                        <td>Du beantwortest die Frage für dich selber und schreibst diese sogar einmal extern auf. Danach kannst du deine Antwort
                                            mit geprüften Antwort des Systems vergleichen. Danach bewertest du deine Antwort mit richtig oder falsch.
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Texteingabe</td>
                                        <td>Du gibst eine Antwort in das Textfeld ein und deine Antwort wird mit der richtigen Antwort verglichen. </td>
                                    </tr>
                                    </tbody>
                                </Table>

                                Eine Karteikarte wird persönlich für dich als Nutzer in drei Stufen eingeteilt, damit du
                                deinen
                                Lernvortschritt im überblick behälst.
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        Es gibt die Stufe "Kann ich nicht"(in dem Statistik Graphen rot)
                                    </Row>
                                    <Row className="mb-1">
                                        Es gibt die Stufe "geht so"(in dem Statistik Graphen gelb/orange)
                                    </Row>
                                    <Row className="mb-1">
                                        Es gibt die Stufe "kann ich"(in dem Statistik Graphen grün)
                                    </Row>
                                </Col>
                                Du kannst jede Karteikarte mit bestimmten Tags ausstatten.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Wie erstelle ich eine Karteikarte?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Eine Karteikarte wird immer für ein Register erstellt. Wähle also erst das Register aus
                                in
                                dem du die neue Karteikarte erstellen möchtest.
                                In der Registerdetail Ansicht ist die obere linke Karte ähnlich wie beim Dashboard dafür
                                da
                                eine neue Karte zu erstellen. Durch das Anklicken dieser Karte
                                wirst du auf eine neue Seite verwiesen.
                                <br/>
                                Dort kannst du zunächst die Frage der Karteikarte angeben und den Typ der Karteikarte
                                auswählen. Anhand des Ausgewählten Typs
                                erscheint ein Formular. In diesem Formular muss die Antwort angeben werden und es kann
                                ein
                                oder mehrere Tags angeben werden. Bei den Single und Multiple Choice Formular kann man
                                durch den Knopf + kann eine neue Antwortmöglichkeit hinzugefügt werden. Bei den
                                Fragetypen
                                Selbstkontrolle und Texteingabe gibt es für die Antwort ein Textfeld.
                                <br/>
                                Bei Single und Multiple Choice müssen die richtigen Antworten angehakt werden.
                                Desweitern
                                werden beim welchseln von Single zu Multiple choice das Formular übernommen.
                                <br/>
                                Bei Selbstkontrolle und Texteingabe wird das Formular ebenfalls übernommen. Da sich auch
                                diese beiden Fragetypen stark ähneln.
                                <br/>
                                Zu den Tags. Man kann durch eingaben in das Eingabefeld Tags suchen. Wenn kein Tag mit
                                dieser Signatur vorhanden ist wird ein neuer Tag mit dieser Signatur erstellt.
                                durch Anklicken der Tags werden diese dann der Karte hinzugefügt.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Wie bearbeite ich eine Karteikarte?</CardTitle>
                            <CardText className="px-2 text-justify">
                                In der Registerdetail Ansicht befindet sich eine übersicht über alle Karteikarten, dort
                                kannst du die Karteikarte anklicken die du bearbeiten möchtest.
                                Anschießend hast du das selbe Formular wie bei dem erstellen einer Karteikarte. Du
                                kannst
                                nun Änderungen vornehmen und diese mit speichern bestätigen.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="tags">Was sind Tags?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Tags sind dazu da, um deine Karteikarten zu strukturieren. Sie sollen deine Karteikarten
                                in
                                feinere Kategorien unterteilen.
                                Beispiel: Register.Deutsch Karteikarten Frage: Wer hat Kabale und Liebe geschreiben
                                Tags:
                                Autoren, Sturm und Drang, Schiller
                                Jeder Karteikarten können beliebig viele Tags zugeordnet werden. Die Tags werden
                                innerhalb
                                eines Registers gespeichert.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="register">Register</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Was ist ein Register?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Ein Register ist eine Sammulung von beliebig vielen Karteikarten. Diese Sammlung kann
                                ein
                                oder mehrere Lernthemen repäsentieren.
                                In einem Register hast du die Möglichkeit neue Karteikarten zu erstellen. Ein Register
                                kannst du mit andern Leuten teilen indem du
                                diese einlädst. Du kannst jedem Mitglied in deinem Register für dieses Register
                                bestimmte
                                Rollen geben. <a href="#role"> Mehr zu Rollen hier!</a>
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="role">Was sind Rollen?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Über die Rolle sind die Rechte eines Mitglieds deines Registers definiert.
                                Folgende Rechte gibt es:
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        1. Darf Karten lesen
                                    </Row>
                                    <Row className="mb-1">
                                        2. Darf neue Karten erstellen
                                    </Row>
                                    <Row className="mb-1">
                                        3. Darf alle Karten bearbeiten
                                    </Row>
                                    <Row className="mb-1">
                                        4. Darf alle Karten löschen
                                    </Row>
                                    <Row className="mb-1">
                                        5. Darf Mitglied zum Register hinzufügen (mit-Lese-Rechten=) kann Mitglied
                                        löschen
                                    </Row>
                                    <Row className="mb-1">
                                        6. Darf Mitglied rechte zuweisen
                                    </Row>
                                </Col>
                                Es gibt drei verschiedene Rollen:
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        Abonnent: 1
                                    </Row>
                                    <Row className="mb-1">
                                        Redakteur: 1,2,3,4
                                    </Row>
                                    <Row className="mb-1">
                                        Eigentümer: 1,2,3,4,5,6
                                    </Row>
                                </Col>
                                Die Standard Rolle eines neuen Mitglieds ist Abonnent
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Wie Erstelle ich ein Register?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Um ein neues Register zu erstellen klicke auf die Karte oben links auf deinem Dashboard.
                                Als nächstes müsstest du auf eine neue Seite umgeleitet werden.
                                <br/>
                                Dort gibst du den Titel an den dein Register haben soll.
                                Denk hierbei dran, dass es sindvoll ist einen Titel zu wählen, welcher das Thema des in
                                diesem Register wieder gibt.
                                Beispiel: In einem Register, in dem es um das Fach Betriebswirtschaftslehre geht, nennt
                                man
                                das Register: BWL oder Betriebswirtschaftslehre
                                Ein guter Titel hilft dir und andern, mit den du das Register teilst, schnell zu
                                verstehen
                                worum es in diesem Register geht.
                                <br/>
                                In dem Bereich Beschreibung kannst du dann das Thema dieses Registers genauer
                                beschreiben.
                                Die Beschreibung wird in der Registerdetail Ansicht angezeigt und
                                soll dir und andern Leuten helfen ein genaues verständniss davon zu haben worum es in
                                diesem
                                Register geht
                                <br/>
                                Die letzte Sache die du beim Erstellen eines Registers angeben kannst sind Mitglieder
                                die
                                dieses Register mit benutzen können.
                                Dafür trage in das Suchfeld entweder E-Mail oder den Anzeigenamen desjenigen, den du
                                einladen willst ein. Wenn diese Person gefunden wurde
                                kannst du noch die Rolle desjenigen angeben.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Wie Verwalte ich mein Register?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Dazu musst du über das Dashboard auf das Register öffnen, welches du Verwalten oder
                                Bearbeiten möchtest. Vom Dashboard gelangst du dann zu der
                                Registerdetail Ansicht. Dort gibt es unter der Beschreibung keinen Link "Bearbeiten".
                                Klicke
                                auf diesen Link. Du bekommst nun das selbe Formular wie schon beim erstellen eines
                                Registers. Du kannst dort jetzt änderungen vornehmen und diese dann bestätigen. Dadurch
                                werden die Änderungen übernommen. Desweitern kannst du dort auch das gesamte Register
                                löschen
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Was sehe ich auf der Registerdetail Ansicht?</CardTitle>
                            <CardText className="px-2 text-justify">
                                In der Registerdetail Ansicht befinden sich alle relevaten Informationen zu dem
                                Register. In
                                der oberen Leiste wird ist Links die Beschreibung des Registers zu sehen, sowie der
                                Link zum Bearbeiten oder Verwalten des Registers. Der mittlere Teil dazu da, die nötigen
                                Einstellungen zum lernen auswählen. Rechts befindet sich deine persönliche Statistik zu
                                diesem
                                Register und falls sich noch weitere Mitglieder in dem Register befinden, werden diese
                                durch
                                die kürzel angezeigt. Unter der Leiste befinden sich alle Karten, die sich in dem
                                Register
                                befinden.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="learn">Lernen</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Wie lerne ich?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Zum Lernen wähle das Register aus in dem sich die Karten befinden, die du lernen
                                möchtest.
                                Anschließend kannst du auf der Registerdetail Ansicht den Lernmodus wählen.
                                Anschließend kannst du durch den Lernen starten Knopf das Lernen beginnen. So würdest du
                                alle sich in dem Register befindliche Karten lernen. Um deine Auswahl zu Filtern kannst
                                du
                                überhalb der Lernvarianten die Tags auswählen. Wenn du Tags ausgewählt hast werden nur
                                die
                                Karten die den Tag haben zum lernen ausgewählt. Eine Karte muss nur einen der
                                Ausgewählten
                                Tags besitzen um in dieser Lernrunde gelernt zu werden.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="learnmode">Was sind die Lernvarianten?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Bei GoCard gibt es drei Lernvarianten:
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        1. Normal (in diesem Modus werden alle ausgewählten Karten durchlaufen und man
                                        bekommt dirket Angezeigt ob die Antwort Richtig oder Falsch ist)
                                    </Row>
                                    <Row className="mb-1">
                                        2. Power (in diesem Modus werden speziell die Karten gelernt die mit "kann ich
                                        nicht" bewertet sind und man bekommt dirket Angezeigt ob die Antwort Richtig
                                        oder
                                        Falsch ist)
                                    </Row>
                                    <Row className="mb-1">
                                        3. Klausur (in diesem Modus werden alle ausgewählten Karten gelernt man bekommt
                                        nur
                                        am Ende gesagt welche Antwort Richtig oder Falsch war)
                                    </Row>
                                </Col>
                                Nach jedem Lerndurchlauf gibt es eine Feedback Anzeige.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="feedback">Was sehe ich auf dem Feedback?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Auf dem Feedback siehts du oben links die Beschreibung des Registers und die verwendeten
                                Tags. Auf der Rechten Seite findest du einen
                                Graphen der dir zeigt wie sich deine Lernen auf deine Statistik ausgewirkt hat. Auf dem
                                Balken Graphen ist der linke Balken immer das neue Ergebnis und der
                                rechte der Balken der alten Statistik. Unten hast du ähnlich wie bei der Registerdetail
                                Ansicht alle Karten die beim Lernen verwendet wurden. Desweitern kann man diese
                                Anzeige der Karten Filtern. Man kann sich alle Anzeigen lassen, nur die richtig
                                Beantworteten, nur die falsch Beantworteten oder die, die man übersprungen hat.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="account">Account</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Wo kann ich mein Profil bearbeiten?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Auf jeder Seite findest du oben rechts deinen Namenskürzel in Form eines Icons und
                                deinen
                                Anzeigenamen. Durch klicken auf den Namen oder das Icon kommst du zur
                                Profilverwaltung. Auf dieser Seite hast du eine Auflistung deiner Accountdaten. Du
                                kannst
                                dort in die Felder hineinklicken und die Daten ändern. Anschließend kannst auf speichern
                                drücken
                                damit die Änderungen übernommen werden.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Account</CardTitle>
                            <CardText className="px-2 text-justify">
                                Beim Account wird zwischen zwei Optionen entschieden. Zum einen gibt es den GoCard
                                Account.
                                Jeder kann sich einen solchen Account erstellen indem er seine E-Mail und
                                ein Password angibt. Der andere Account ist ein spezieller Account für die Studenten der
                                Hochschule Düsseldorf. Die Studenten der Hochschule Düsseldorf können sich über
                                Shibboleth
                                mit
                                ihren Hochschul Account anmelden.
                                <br/>
                                Zwischen den beiden Accounts gibt es sonst keine unterschiede. Es gibt keine Vorteile
                                durch
                                den Hochschulaccount
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Anzeigename</CardTitle>
                            <CardText className="px-2 text-justify">
                                Beim ersten Login muss ein Anzeigename festgelegt werden. Dieser Name ist öffentlich
                                sichtbar. Über diesen Anzeigenamen haben andere Nutzer die Möglichkeit dich zu Registern
                                einzuladen.
                                Dein Anzeigename ist nicht einzigartig sondern kann auch von andern genutzt werden. Also
                                teile am besten den Leuten die dich zu Registern einladen wollen auch deine E-Mail
                                Adresse
                                mit.
                                Der Anzeigename kann auf der Profil bearbeiten Seite geändert werden.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Initaler Anmelde Dialog</CardTitle>
                            <CardText className="px-2 text-justify">
                                Beim ersten Login muss sowohl die dieser Seite bestätigt werden, als
                                auch ein Anzeige Name festgelegt werden. Bitte lesen sie sich die EULA vor dem
                                bestätigen
                                durch. Falls sie die EULA ablehnen können sie diese Seite nicht nutzen. Erst mit der
                                bestätigung der EULA wird ihr Account entgültig freigegben.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Login</CardTitle>
                            <CardText className="px-2 text-justify">
                                Für den Login gebe die E-Mail Adresse des Accounts und das zu dem Account gehörige
                                Passwort
                                ein. Wenn ein Fehler auftritt überprüfe, ob du die richtige E-Mail und das richtige
                                Passwort eingeben hast. Wenn du dein Passwort vergessen hast klicke auf Passwort
                                vergessen.
                                Wenn du noch kein Account bis jetzt erstellt hast, dann Klicke auf "GoCard-Account
                                erstellen".
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Passwort vergessen</CardTitle>
                            <CardText className="px-2 text-justify">
                                Wenn du dein Passwort vergessen hast aber deine E-Mail Adresse noch kennst, kannst du
                                dein
                                Passwort zurücksetzten. Das Passwort wird zurückgesetzt indem du eine E-Mail bekommst
                                mit einem neuen Passwort zugeschickt bekommst. Nutze dieses Passwort, um dich
                                einzuloggen.
                                Du kannst dann übers Profilbearbeiten dein Passwort wieder neu setzten.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Account erstellen</CardTitle>
                            <CardText className="px-2 text-justify">
                                Zum Erstellen eines GoCard-Accounts muss man eine gültige E-Mail Adresse angeben und ein
                                Passwort. Das Passwort muss man in dem Passwort wiederholen Eingabefeld nochmals
                                bestätigen.
                                Das Bedeutet diese beiden Passwörter müssen gleich sein.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="">Sonstiges</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Was ist das Dashboard?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Auf dem Dashboard befinden sich alle Register zu denen du zugang hast. Also nicht nur
                                die
                                Register, die du selbst erstellt hast
                                sondern auch die Register zu denen du Eingeladen worden bist. Die Reihenfolge in der die
                                Register angezeigt werden ist abhängig von der Benutzung des Registers.
                                Am weitesten oben sind die Register die man als letztes zum lernen benutzt hat.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Navigation</CardTitle>
                            <CardText className="px-2 text-justify">
                                Im oberen Bereich der Seite baut sich vom Dashboard aus eine Navigationzeile zusammen,
                                die
                                dir deinen Weg bis zu der Seite, auf der du dich befindest anzeigt. Durch das Klicken
                                auf
                                einen
                                der Pfade gelangst du wieder an diesen Punkt zurück. Desweitern kannst du immer wieder
                                zurück zum Dashboard gelangen indem du auf das GoCard Logo drückst.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Weitere Seiten</CardTitle>
                            <CardText className="px-2 text-justify">
                                Im untern bereich der Seite befinden sich eine Reihe von Links die Rechtliche oder
                                Organisatorische Funktionen haben. Auf der Seite <a href="privacy-policy">
                                Datenschutzerklärung</a> kannst du nachlesen
                                was mit deinen Daten passiert. Die <a href="eula">EULA</a> solltest du lesen, um zu
                                wissen
                                was auf dieser Seite erlaubt ist. Das <a href="inprint">Impressum</a> liefert dir einen
                                überblick über die Eigentümer der Seite und bietet dir die Möglichkeit mit uns Kontakt
                                aufzunehmen. Der Punkt <a href="license">Lizenz</a> ist zur Rechtlichen absicherung, da
                                für
                                die
                                Entwicklung dieser Seite Tools und Librarys verwendet wurden.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="processes">Prozesse</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Ablauf Lernen</CardTitle>
                            <CardText className="px-2 text-justify">


                                <Media className="mt-1">

                                    <Media body>
                                        Die Ausgangsposition ist das Dashboard. Wähle von hier aus das gewünschte
                                        Register aus, indem die Karteikarten liegen, die du lernen möchtest.
                                    </Media>
                                    <Media right href="#">
                                        <Media object data-src="" alt="Das sollte eig ein BIld werden!" />
                                    </Media>
                                </Media>




                                1. Register Auswählen
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        Die Ausgangsposition ist das Dashboard. Wähle von hier aus das gewünschte
                                        Register
                                        aus, indem die
                                        Karteikarten liegen, die du lernen möchtest.


                                    </Row>
                                </Col>
                                2. Tags Auswählen
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        Mit der Auswahl der Tags kannst du einschränken, welche Karten du lernen willst.
                                        Nur
                                        Karten die einen oder
                                        mehrere der Ausgewählten Tags besitzen zum Lernen ausgewählt. Wenn du keine Tags
                                        Angibst werden alle sich im Register befindlichen Karten gelernt.
                                    </Row>
                                </Col>
                                3. Lernvariante Auswählen
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        Für eine Erklärung der Lernvariante <a href="#learnmode">Hier!</a>
                                    </Row>
                                </Col>
                                4. Fragen Beantworten oder Überspringen
                                <br/>
                                5. Feedback
                                <Col className="px-4 text-justify">
                                    <Row className="mb-1">
                                        Wenn du alle Karten durch gelernt hast, kommst du automatisch in die Feedback
                                        Ansicht.
                                    </Row>
                                </Col>
                            </CardText>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Help;
