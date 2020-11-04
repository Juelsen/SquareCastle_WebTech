package controllers

import aview.TUI.{TUI, TUIInterface}
import gamecontrol.supervisor.{SupervisorInterface, supervisor}
import gamecontrol.controller.{Controller, ControllerInterface}
import gamecontrol.updateEvent
import javax.inject.Inject
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, WebSocket}
import play.api.i18n.I18nSupport

import scala.main.{supervisor, tui}
import scala.swing.Reactor


class GameController @Inject() (cc:ControllerComponents) extends AbstractController(cc) with I18nSupport with Reactor{

  val supervisor: SupervisorInterface = scala.main.supervisor
  val controller: ControllerInterface = scala.main.Controller
  supervisor.controller = controller
  this.listenTo(supervisor.controller)

  reactions += {
    case event : updateEvent=>
    if(event.code == 0)
      sendline(event.word)
    if(event.code == 1)
      send(event.word)
  }
  def sendline(s: String) = Action {
    Ok(views.html.squarecastle(1,"empfangen",s ,supervisor.playersturn))
  }
  def send(s: String) = Action {
    Ok(views.html.squarecastle(0,"empfangen",s ,supervisor.playersturn))
  }
  def put(s: String): Action[AnyContent] = Action {
    controller.befehl = s
    //supervisor.controller.befehl = s;
    supervisor.newRoundactive()
    supervisor.state = !supervisor.state
    supervisor.newRound()

    Ok(views.html.squarecastle(1,"gesendet","",supervisor.playersturn))

  }
  def squarecastle: Action[AnyContent] = Action{
    supervisor.testfall();
    supervisor.newRound()

    Ok(views.html.squarecastle(1,"STARTE SPIEL","",supervisor.playersturn))
  }

  def about(): Action[AnyContent] = Action {
    Ok(views.html.index())
  }
}
