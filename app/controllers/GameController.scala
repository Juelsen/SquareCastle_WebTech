package controllers

import aview.TUI.{TUI, TUIInterface}
import gamecontrol.supervisor.{SupervisorInterface, supervisor}
import gamecontrol.controller.{Controller, ControllerInterface}
import gamecontrol.{InsertedEvent, updateEvent}
import javax.inject.Inject
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, WebSocket}
import play.api.i18n.I18nSupport

import scala.main.{supervisor, tui}
import scala.swing.Reactor


class GameController @Inject() (cc:ControllerComponents) extends AbstractController(cc) with I18nSupport with Reactor{

  val supervisor: SupervisorInterface = scala.main.supervisor
  val controller: ControllerInterface = scala.main.Controller
  supervisor.controller = controller
  var str:String = ""

  this.listenTo(controller)
  reactions += {
    case event: InsertedEvent =>
        this.send(supervisor)

  }

  def put(s: String): Action[AnyContent] = Action {

    controller.befehl = s
    //supervisor.controller.befehl = s;
    supervisor.newRoundactive()
    supervisor.state = !supervisor.state
    supervisor.newRound()

    Ok(views.html.squarecastle("gesendet",supervisor))

  }
  def squarecastle: Action[AnyContent] = Action{
    supervisor.testfall();
    supervisor.newRound()

    Ok(views.html.squarecastle("STARTE SPIEL",supervisor))
  }

  def about(): Action[AnyContent] = Action {
    Ok(views.html.index())
  }

  def send(supervisor:SupervisorInterface): Unit = {
    Ok(views.html.squarecastle("empfangen",supervisor))
    //views.html.squarecastle.apply("empfangen", s , supervisor.playersturn)
    //views.html.squarecastle.render("empfangen", s , supervisor.playersturn)
  }
}
