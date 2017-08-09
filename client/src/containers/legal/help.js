import React from "react";
import Headline from "../shared/headline";
import {
    Card,
    CardBlock,
    CardText,
    CardTitle,
    Col,
    ListGroup,
    ListGroupItem,
    ListGroupItemText,
    NavLink,
    Row,
    Table
} from "reactstrap";


const Help = () => {
    return (
        <div id="top" className="help">

            <Headline title="Hilfe">
                Auf dieser Seite kann Dir vielleicht bei Fragen und Probleme geholfen werden.
            </Headline>
            <Row>


                <Col>
                    <Card>
                        <CardBlock>
                            <CardBlock id="top">
                                <Row>
                                    <Col className="mt-2">
                                        <NavLink href="#card" className="btn btn-outline-primary">Karteikarten</NavLink>
                                    </Col>
                                    <Col className="mt-2">
                                        <NavLink href="#register" className="btn btn-outline-primary">Register</NavLink>
                                    </Col>
                                    <Col className="mt-2">
                                        <NavLink href="#learn" className="btn btn-outline-primary">Lernen</NavLink>
                                    </Col>
                                    <Col className="mt-2">
                                        <NavLink href="#account" className="btn btn-outline-primary">Account</NavLink>
                                    </Col>
                                    <Col className="mt-2">
                                        <NavLink href="#special" className="btn btn-outline-primary">Sonstiges</NavLink>
                                    </Col>
                                    <Col className="mt-2">
                                        <NavLink href="#processes" className="btn btn-outline-primary">Abläufe</NavLink>
                                    </Col>
                                </Row>
                            </CardBlock>


                            <span><hr/></span>

                            <CardTitle id="card" className="">Karteikarten</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Was ist eine Karteikarte?</CardTitle>

                            <CardText className="px-2 text-justify">

                                Eine Karteikarte ist ein Medium zum Lernen. Dieses Medium ist meist eine zweiseitige
                                Karte,
                                wobei die Vorderseite mit einem Thema bzw. einer Frage ausgestattet wird. Die Rückseite
                                ist dann mit der richtigen Antwort versehen.
                                Bei GoCard ist eine Karteikarte auf ähnliche Weise umgesetzt. Du erstellst eine
                                Karteikarte und gibst dazu die entsprechenden Antworten.
                                Dies kannst du dann beliebig wiederholen, so wie du magst. Bei uns gibt es vier
                                Kartentypen, die du auswählen kannst.
                            </CardText>

                            <ListGroup className="text-left mt-3 mb-3">

                                <ListGroupItem>
                                    <ListGroupItemText>
                                        <b>Single Choice</b> -
                                        Es gibt mehrere Antwortmöglichkeiten, aber nur eine Antwort ist richtig.
                                    </ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <ListGroupItemText>
                                        <b>Multiple Choice</b> -
                                        Es gibt mehrere Antwortmöglichkeiten und es können eine oder mehrere
                                        Antworten richtig sein.
                                    </ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <ListGroupItemText>
                                        <b>Selbstkontrolle</b> -
                                        Du beantwortest die Frage für dich selbst. Anschließend wird dir die
                                        richtige Antwort angezeigt und du bewertest deine gegebene Antwort mit
                                        richtig oder falsch.
                                    </ListGroupItemText>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <ListGroupItemText>
                                        <b>Texteingabe</b> -
                                        Du gibst eine Antwort in das Textfeld ein und deine Antwort wird mit der
                                        richtigen Antwort verglichen.
                                    </ListGroupItemText>
                                </ListGroupItem>

                            </ListGroup>
                            <CardText className="px-2 text-justify">
                                Eine Karteikarte wird für dich persönlich in drei Bewertungsstufen eingeteilt, damit du
                                deinen Lernfortschritt im Überblick behältst. Jede Karte hat einen Wert(Score).Dieser
                                Wert
                                gib, an wie gut du diese Karte kannst. Der Wert einer Karte verändert sich durchs
                                Lernen.
                                Beantwortest du eine Frage richtig, wird der Score um 1 erhöht. Beantwortest du die
                                Karte falsch oder
                                oder überspringst die Karte, wird der Score um 1 verringert
                            </CardText>

                            <Table responsive className="mt-2 mb-3 text-left">
                                <thead>
                                <tr>
                                    <th>Bewertungsstufe</th>
                                    <th>Beschreibung</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Schlecht</td>
                                    <td>Wird im Statistik Graphen rot dargestellt.
                                        Score kleiner als 3
                                    </td>
                                </tr>
                                <tr>
                                    <td>Geht so</td>
                                    <td>Wird im Statistik Graphen gelb/orange dargestellt.
                                        Score kleiner als 6
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gut</td>
                                    <td>Wird im Statistik Graphen grün dargestellt.
                                        Score größer als 5
                                    </td>
                                </tr>
                                </tbody>
                            </Table>


                            <span><hr/></span>

                            <CardTitle>Wie erstelle ich eine Karteikarte?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Eine Karteikarte wird immer für ein Register erstellt. Wähle also erst das Register aus,
                                indem du die neue Karteikarte erstellen möchtest.
                                In der Registerdetailansicht ist eine Karte vorhanden mit dem Titel "Neue Karteikarte".
                                Durch das Anklicken dieser Karte
                                wirst du auf eine neue Seite verwiesen.
                                <br/>
                                Dort kannst du zunächst die Frage der Karteikarte angeben und den Typ der Karteikarte
                                auswählen. Anhand des ausgewählten Typs
                                erscheint ein Formular. In diesem muss du die entsprechenden Antworten angeben und du
                                kannst einer Karteikarte beliebig viele Tags geben.
                                Bei dem Single und Multiple Choice Formular kannst du neue Antwortmöglichkeit
                                hinzufügen, indem du den Button "Antwortmöglichkeiten hinzufügen" betätigst.
                                Bei den Fragetypen Selbstkontrolle und Texteingabe gibt es für die Antwort ein Textfeld.
                                <br/>
                                Bei Single und Multiple Choice müssen die richtigen Antworten ausgewählt werden.
                                Bei Selbstkontrolle und Texteingabe gilt die Eingabe in dem Textfeld als die richtige
                                Antwort.
                                <br/>
                                Du kannst in einem Eingabefeld nach Tags suchen. Gibt es kein Tag mit dieser vorhandenen
                                Signatur, kannst du
                                diesen Tag erstellen. Durch Auswahl eines Tags wird dieser der Karteikarte hinzugefügt.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Wie bearbeite ich eine Karteikarte?</CardTitle>
                            <CardText className="px-2 text-justify">
                                In der Registerdetailansicht befindet sich eine Übersicht über alle Karteikarten, dort
                                kannst du die Karteikarte anklicken und kommst zu einer detailierten Anzeige der Karte.
                                Über den
                                Link "Bearbeiten" kommst du zur Seite zum Bearbeiten dieser Karte. Beim bearbeiten
                                kannst du alle
                                Einstellungen der Karte neu definieren. Desweiteren hast du die Möglichkeit eine Karte
                                zu löschen.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="tags">Was sind Tags?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Tags sind dazu da, um deine Karteikarten zu strukturieren. Sie sollen deine Karteikarten
                                in Kategorien unterteilen. Die Tags bieten dir die Möglichkeit eine Auswahl zu treffen,
                                welche Karten du lernen möchtest.
                                <br/>
                                <tt>
                                    Beispiel. Register: Deutsch Karteikarten Frage: Wer hat Kabale und Liebe geschrieben
                                    Tags:
                                    Autoren, Sturm und Drang, Schiller </tt>
                                <br/>
                                Jeder Karteikarte können beliebig viele Tags zugeordnet werden. Die Tags werden
                                innerhalb
                                eines Registers gespeichert.
                            </CardText>

                            <hr/>
                            <CardText><a href="#top">Zurück nach oben</a> </CardText>

                            <span><hr/></span>

                            <CardTitle id="register">Register</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Was ist ein Register?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Ein Register ist eine Sammlung von beliebig vielen Karteikarten. Diese Sammlung kann
                                ein
                                oder mehrere Lernthemen repräsentieren.
                                In einem Register hast du die Möglichkeit neue Karteikarten zu erstellen. Ein Register
                                kannst du mit anderen Leuten teilen, indem du
                                diese einlädst. Du kannst jedem Mitglied in deinem Register, für dieses Register,
                                eine bestimmte
                                Rolle geben.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="role">Was ist eine Rolle?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Über die Rolle sind die Rechte eines Mitglieds deines Registers definiert.
                                Folgende Rechte gibt es:
                            </CardText>
                            <Table responsive className="mt-2 mb-3 text-left">
                                <thead>
                                <tr>
                                    <th>Rolle</th>
                                    <th>Rechte</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Abonnent</td>
                                    <td>Darf Karte lesen</td>
                                </tr>
                                <tr>
                                    <td>Redakteur</td>
                                    <td>Darf Karte lesen, neue Karte erstellen, alle Karten bearbeiten und alle
                                        Karten löschen
                                    </td>
                                </tr>
                                <tr>
                                    <td>Eigentümer</td>
                                    <td>Darf Karte lesen, neue Karte erstellen, alle Karten bearbeiten, alle Karten
                                        löschen, Mitglied zum Register hinzufügen und löschen und kann Mitgliedern
                                        Rollen zuweisen.
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <CardText className="px-2 text-justify">
                                Die "Standard" Rolle eines neuen Mitglieds ist Abonnent.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Wie Erstelle ich ein Register?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Um ein neues Register zu erstellen, klicke auf die Karte mit dem Titel "Neues Register".
                                Daraufhin wirst du auf die Register erstellen Seite verwiesen.
                                <br/>
                                Dort gibst du den Titel an, den dein Register haben soll.
                                Denk hierbei dran, dass es sinnvoll ist einen Titel zu wählen, welcher das Thema
                                dieses Registers wieder gibt.
                                <br/>
                                <tt>
                                    Beispiel. In einem Register, in dem es um das Fach Betriebswirtschaftslehre geht,
                                    kannst du
                                    das Register BWL oder Betriebswirtschaftslehre nennen. </tt>
                                <br/>
                                Ein guter Titel hilft dir und anderen, mit denen du dein Register teilst, schnell zu
                                verstehen
                                worum es in diesem Register geht.
                                <br/>
                                In dem Bereich Beschreibung kannst du das Thema dieses Registers genauer
                                erläutern.
                                Die Beschreibung wird in der Registerdetailansicht angezeigt und
                                soll dir und anderen Leuten helfen ein genaueres Verständnis darüber zu bekommen, worum
                                es in
                                diesem
                                Register geht.
                                <br/>
                                Die letzte Sache die du beim Erstellen eines Registers angeben kannst sind Mitglieder,
                                die
                                dieses Register mitbenutzen können.
                                Dafür gebe in das Suchfeld entweder E-Mail Adresse oder den Anzeigenamen desjenigen ein,
                                den du
                                einladen möchtest. Wenn diese Person gefunden wurde,
                                kannst du noch die Rolle desjenigen angeben.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Wie verwalte ich mein Register?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Wähle auf dem Dashboard das Register aus, welches du Verwalten oder
                                Bearbeiten möchtest. Vom Dashboard gelangst du dann zu der
                                Registerdetailansicht. Dort gibt es unter der Beschreibung keinen Link "Bearbeiten".
                                Über diesen Link kommst du auf die Seite Register bearbeiten. Das Formular zum
                                Bearbeiten eines Registers ist dasselbe wie beim Erstellen eines Registers.
                                Du kannst dort Änderungen vornehmen und diese dann bestätigen. Dadurch
                                werden die Änderungen übernommen. Desweitern kannst du dort auch das gesamte Register
                                löschen.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Was sehe ich auf der Registerdetailansicht?</CardTitle>
                            <CardText className="px-2 text-justify">
                                In der Registerdetailansicht befinden sich alle relevanten Informationen zu deinem
                                Register. Der obere Bereich ist in drei Segmente unterteilt. In dem ersten Segment steht
                                die Beschreibung des Registers und ein Link zum
                                Bearbeiten des Registers. Im zweiten befinden sich die Tags des Registers und die
                                Auswahl des Lernmodus. Desweitern befindet sich in diesem Segment der Button
                                Lernen starten. Das letzte Segment zeigt dir deine aktuelle Statistik des Registers an.
                                Es werden auch die Benutzer des Registers angezeigt.
                                Unter diesen Segmenten wird dir die Sammlung all deiner Karten in diesem Register
                                angezeigt.
                            </CardText>

                            <hr/>
                            <CardText><a href="#top">Zurück nach oben</a> </CardText>

                            <span><hr/></span>

                            <CardTitle id="learn">Lernen</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Wie lerne ich?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Zum Lernen wähle das Register aus in dem sich die Karten befinden, die du Lernen
                                möchtest.
                                Die erste Auswahl die du treffen kannst ist welche Tags du verwenden möchtest.
                                Wenn du keine Tags auswählst, werden alle Karten die sich in diesem Register befinden,
                                zum Lernen verwendet.
                                Andernfalls werden nur die Karten zum lernen verwendet die mindestens einen der
                                ausgewählten Tags beinhalten.
                                Anschließend kannst du auf der Registerdetailansicht den Lernmodus auswählen.
                                Wenn du deine Einstellungen gewählt hast, kannst du über den Button "Lernen starten"
                                loslegen.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="learnmode">Was sind die Lernvarianten?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Bei GoCard gibt es drei Lernvarianten:
                            </CardText>
                            <Table responsive className="mt-2 mb-3 text-left">
                                <thead>
                                <tr>
                                    <th>Lernmodus</th>
                                    <th>Beschreibung</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Normalmodus</td>
                                    <td>in diesem Modus werden alle ausgewählten Karten durchlaufen und du
                                        bekommst direkt angezeigt, ob die Antwort "Richtig" oder "Falsch" ist.
                                    </td>
                                </tr>
                                <tr>
                                    <td>Powermodus</td>
                                    <td>in diesem Modus werden speziell die Karten gelernt die mit "Schlecht" oder
                                        "Unbeantwortet" bewertet sind und du bekommst direkt angezeigt, ob die Antwort
                                        "Richtig"
                                        oder "Falsch" ist.
                                    </td>
                                </tr>
                                <tr>
                                    <td>Klausurmodus</td>
                                    <td>in diesem Modus werden alle ausgewählten Karten gelernt du bekommst
                                        nur am Ende gesagt welche Antwort "Richtig" oder "Falsch" war.
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                            <CardText>
                                Nach jedem Lerndurchlauf gibt es eine Feedbackanzeige. Dort kann du alle Details wie zum
                                Beispiel deine
                                gegebenen Antworten und deine neue und alte Statistik sehen.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="feedback">Anzeige der Antwort</CardTitle>
                            <CardText className="px-2 text-justify">
                                Im Power und Normalmodus bekommst du ein direktes Feedback. Das Feedback
                                unterscheidet sich je nach Karten Typ. Beim Single Choice werden alle Antworten angezeigt.
                                Die richtige Antwort wird durch einen Haken gekennzeichnet. Deine Antwort wird mit rot oder grün
                                hinterlegt. Die Ausgabe beim Multiple Choice funltioniert nach dem selben Prinzip. Bei der Texteingabe
                                wird deine Antwort Angezeigt und mit grün oder rot hinterlegt. Bei der Selbstkontrolle gibt es nur ein Feedback, wenn man die
                                Frage überspringt.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle id="feedback">Was sehe ich auf dem Feedback?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Der obere Bereich des Feedbacks ist in zwei Segmente aufgeteilt. In dem ersten Segment
                                sieht du die Beschreibung
                                des Registers und die in diesem Lerndurchlauf verwendeten Tags. In dem anderen Segment
                                befindet sich ein Statistikgraph.
                                Der Statistikgraph liefert dir Informationen zu den in diesem Lerndurchlauf verwendeten
                                Karten. Es wird die Bewertungsstufe angegeben.
                                <br/>
                                <tt>
                                    Bsp: Du hast 10 Karteikarten im Lerndurchlauf verwendet. 3 davon "Gut", 5 "Geht
                                    so" und
                                    2 "Schlecht". Das Balkendiagramm würde dann grün 3, gelb 5 und rot 2 hoch
                                    sein.
                                </tt>
                                <br/>
                                Im unteren Bereich findest du eine Übersicht der Karteikarten, in form einer
                                Feedbackkarte, die du gelernt hast. Die Feedbackkarten haben
                                einen Rahmen, der Anzeigt, ob die Karteikarte richtig, falsch oder mit Überspringen
                                beantwortet wurde.
                                Hierbei steht ein grüner Rahmen für Richtig, ein roter für Falsch und ein grauer für
                                Übersprungen.
                                Auf der Feedbackkarte wird die Frage angezeigt und die Antwortmöglichkeiten. Bei den
                                Antwortmöglichkeiten wird angezeigt, welche Antwort du
                                gegeben hast. Die letzte Information auf der Feedbackkarte ist der Score. Dieser sagt
                                dir, ob du diese Karte "gut, "geht so", "schlecht" oder noch nicht
                                beantwortest hast.
                                Desweitern kann man je nach Lernmodus die Karteikarten filtern. Es können z.B nur
                                richtige oder nur falsche angezeigt werden.

                            </CardText>

                            <hr/>
                            <CardText><a href="#top">Zurück nach oben</a> </CardText>

                            <span><hr/></span>

                            <CardTitle id="account">Account</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Wo kann ich mein Profil bearbeiten?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Auf jeder Seite befindet sich oben rechts eine Anzeige deines Profilicons. Du kannst
                                dort ein
                                Menü aufklappen. Über den Punkt "Einstellungen" gelangst du dann auf deine Profilseite.
                                Dort kannst du
                                Veränderungen an deinem Profil vornehmen.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Anzeigename</CardTitle>
                            <CardText className="px-2 text-justify">
                                Beim ersten Login muss ein Anzeigename festgelegt werden. Dieser Name ist öffentlich
                                sichtbar. Über diesen Anzeigenamen haben andere Nutzer die Möglichkeit, dich zu
                                Registern
                                einzuladen.
                                Dein Anzeigename ist nicht einzigartig, auch andere Benutzer können denselben
                                Anzeigenamen besitzen. Also teilst du am besten
                                den Leuten, die dich zu einem Register einladen wollen, deine E-Mail
                                Adresse
                                mit.
                                Der Anzeigename kann auf deiner Profilseite geändert werden.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Initialer Anmeldedialog</CardTitle>
                            <CardText className="px-2 text-justify">
                                Beim ersten Login muss sowohl die EULA dieser Seite bestätigt werden, als
                                auch ein Anzeigename festgelegt werden. Bitte lesen sie sich die EULA vor dem
                                Bestätigen durch. Falls sie die EULA ablehnen können sie diese Seite nicht nutzen. Erst
                                mit der
                                Bestätigung der EULA wird ihr Account endgültig freigegeben.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Login</CardTitle>
                            <CardText className="px-2 text-justify">
                                Für den Login gebe die E-Mail Adresse des Accounts und das dazu gehörige
                                Passwort
                                ein. Wenn ein Fehler auftritt überprüfe, ob du die richtige E-Mail und das richtige
                                Passwort eingeben hast. Wenn du dein Passwort vergessen hast, klicke auf den Link
                                "Passwort
                                vergessen".
                                Wenn du noch kein Account besitzt, dann klicke auf den Link "GoCard-Account
                                erstellen". Daraufhin wirst du auf die Seite Account erstellen weitergeleitet.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Passwort vergessen</CardTitle>
                            <CardText className="px-2 text-justify">
                                Wenn du dein Passwort vergessen hast, aber deine E-Mail Adresse noch kennst, kannst du
                                dein
                                Passwort zurücksetzten.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Account erstellen</CardTitle>
                            <CardText className="px-2 text-justify">
                                Zum Erstellen eines GoCard-Accounts musst du eine gültige E-Mail Adresse angeben und ein
                                Passwort. Dein Passwort muss eine Ziffer, einen Kleinbuchstaben, einen Großbuchstaben
                                und mindestens 8 Zeichen beinhalten.
                                Das Passwort musst du in dem Passwort wiederholen Eingabefeld nochmals
                                bestätigen.
                            </CardText>

                            <hr/>
                            <CardText><a href="#top">Zurück nach oben</a> </CardText>

                            <span><hr/></span>

                            <CardTitle id="special">Sonstiges</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Was ist das Dashboard?</CardTitle>
                            <CardText className="px-2 text-justify">
                                Auf dem Dashboard befinden sich alle Register zu denen du Zugang besitzt. Also nicht nur
                                die
                                Register, die du selbst erstellt hast,
                                sondern auch die Register zu denen du eingeladen worden bist. Die Reihenfolge in der die
                                Register angezeigt werden ist abhängig von der Benutzung des Registers.
                                Am weitesten oben sind die Register, die du als letztes zum Lernen benutzt hast.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Navigation</CardTitle>
                            <CardText className="px-2 text-justify">
                                Im oberen Bereich einer Seite befindet sich eine Navigationszeile. Diese Zeile stellt
                                den Weg dar, den du vom Dashboard ausgenommen hast.
                                Du kannst somit auf jede Seite, die du genommen hast, zurückkehren. Desweitern kannst du
                                über das GoCard Icon zu jederzeit auf dein Dashboard zurückkehren.
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Rechtliches</CardTitle>
                            <CardText className="px-2 text-justify">
                                Im unteren Bereich der Seite befinden sich eine Reihe von Links die rechtliche oder
                                organisatorische Funktionen haben. Auf der Seite <a href="privacy-policy">
                                Datenschutzerklärung</a> kannst du nachlesen,
                                was mit deinen Daten passiert. Die <a href="eula">EULA</a> solltest du lesen, um zu
                                wissen,
                                was auf dieser Seite erlaubt ist. Das <a href="inprint">Impressum</a> liefert dir einen
                                Überblick über die Eigentümer der Seite und bietet dir die Möglichkeit mit uns Kontakt
                                aufzunehmen. Der Punkt <a href="license">Lizenz</a> ist zur rechtlichen Absicherung, da
                                für
                                die
                                Entwicklung dieser Seite Tools und Libraries verwendet wurden.
                            </CardText>

                            <hr/>
                            <CardText><a href="#top">Zurück nach oben</a> </CardText>

                            <span><hr/></span>

                            <CardTitle id="processes">Prozesse</CardTitle>

                            <span><hr/></span>

                            <CardTitle>Ablauf Register erstellen</CardTitle>
                            <CardText className="px-2 text-justify">
                                1. Neues Register auswählen
                                <br/>
                                Die Ausgangsposition ist das Dashboard. Wähle hier das Feld aus, welches ein "+" hat
                                und den Text "Neues Register".
                                <br/>
                                2. Titel festlegen
                                <br/>
                                Gebe deinem Register einen geeigneten Titel. Ein guter Titel hilft dir später dein
                                Register schnell zu finden.
                                Desweitern hilft der Titel anderen, die du zu diesem Register Eingeladen hast zu
                                verstehen, worum es in diesem
                                Register geht.
                                <br/>
                                3. Beschreibung (optional)
                                <br/>
                                Du kannst deinem Register eine Beschreibung hinzufügen. In dieser kannst du das
                                Themengebiet dieses Registers noch genauer
                                Beschreiben.
                                <br/>
                                4. Mitglieder (optional)
                                <br/>
                                Hier kannst du nach Mitgliedern suchen, mit denen du das Register teilen möchtest. Du
                                kannst Mitglieder über deren Anzeigenamen oder
                                deren Email suchen. An dieser Stelle kannst unter den Mitgliedern auch Rollen verteilen.
                                Mehr zu den Rollen. <a href="role">Hier</a>.
                                <br/>
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Ablauf Karte erstellen</CardTitle>
                            <CardText className="px-2 text-justify">
                                1. Register Auswählen
                                <br/>
                                Die Ausgangsposition ist das Dashboard. Wähle von hier aus das gewünschte
                                Register
                                aus, indem du eine neue Karteikarte erstellen möchtest.
                                <br/>
                                2. Frage festlegen
                                <br/>
                                Trage die Frage ein die für die Karteikarte beantwortet werden soll.
                                <br/>
                                3. Fragetyp Auswählen
                                <br/>
                                Wähle einen der 4 Fragetypen aus. Anschließend bekommst du ein Formular, in dem
                                du die Antworten eintragen kannst.
                                Mehr zum Thema Fragetypen <a href="card">Hier</a>.
                                <br/>
                                4. Tags (optional)
                                <br/>
                                Tags kannst du als letztes Hinzufügen, damit du deine Karten besser Struckturien
                                kannst. <a href="role">Hier</a>.
                                <br/>
                            </CardText>

                            <span><hr/></span>

                            <CardTitle>Ablauf Lernen</CardTitle>
                            <CardText className="px-2 text-justify">
                                1. Register Auswählen
                                <br/>
                                Die Ausgangsposition ist das Dashboard. Wähle von hier aus das gewünschte
                                Register
                                aus, indem die
                                Karteikarten liegen, die du lernen möchtest.
                                <br/>
                                2. Tags Auswählen (optional)
                                <br/>
                                Mit der Auswahl der Tags kannst du einschränken, welche Karten du lernen willst.
                                Nur
                                Karten die einen oder
                                mehrere der Ausgewählten Tags besitzen zum Lernen ausgewählt. Wenn du keine Tags
                                Angibst werden alle sich im Register befindlichen Karten gelernt.
                                <br/>
                                3. Lernvariante Auswählen
                                <br/>
                                Für eine Erklärung der Lernvariante. <a href="learnmode">Hier</a>.
                                <br/>
                                4. Fragen Beantworten oder Überspringen
                                <br/>
                                5. Feedback
                                <br/>
                                Wenn du alle Karten durch gelernt hast, kommst du automatisch in die Feedback
                                Ansicht. Infos zur Feedbackansicht. <a href="feedback">Hier</a>.
                                <br/>
                            </CardText>
                        </CardBlock>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Help;
