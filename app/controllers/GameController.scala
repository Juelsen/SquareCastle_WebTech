package controllers

import aview.TUI.{TUI, TUIInterface}
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.scala.ScalaObjectMapper
import gamecontrol.supervisor.{SupervisorInterface, supervisor}
import gamecontrol.controller.{Controller, ControllerInterface}
import javax.inject.Inject
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request, WebSocket}
import play.api.i18n.I18nSupport
import play.api.libs.json.{JsArray, JsObject, JsPath, JsString, JsValue, Json, Writes}

import scala.swing.Reactor


class GameController @Inject() (cc:ControllerComponents) extends AbstractController(cc) with I18nSupport with Reactor{

  val supervisor: SupervisorInterface = scala.main.supervisor
  val controller: ControllerInterface = scala.main.Controller
  supervisor.controller = controller
  var str:String = ""

  //this.listenTo(controller)
  //reactions += {
  //  case event: InsertedEvent =>
  //      this.send(supervisor)

  //}
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

  def JsonCommand = Action(parse.json) {
    println("json received");
    request: Request[JsValue] => {
      val data = readCommand(request.body)
      clicked(data)
      Ok(sendControllerOutput())
    }
  }

  var Controllerstate = 0;
  var layedX = -1;
  var layedY = -1;
  def sendControllerOutput(): JsValue ={
    //eventuelle Ereignisse als int code
    //'{ "name": "Georg", "alter": 47, "verheiratet": false, "beruf": null}'
    val data = Array.ofDim[String](4)
    data(0) = Controllerstate.toString
    data(1) = supervisor.controller.ImagePath(supervisor.card, supervisor.card)
    if(layedX != -1 && layedY != -1)
      data(2) = supervisor.controller.ImagePath(supervisor.map.field(layedX)(layedY), supervisor.map.field(layedX)(layedY))

    data(3) = supervisor.playersturn.toString
    //val str = "'{ " + data(0) + "," + data(1) + "," + data(2) + "," + data(3) + " }'"


    val jsonArray = Json.toJson(Seq(
      toJson(data(0)), toJson(data(1)), toJson(data(2)), toJson(data(3))
    ))
    jsonArray
  }

  def toJson(value: Any): String = {
    val JacksMapper = new ObjectMapper() with ScalaObjectMapper
    JacksMapper.writeValueAsString(value)
  }
  def SendController = Action(parse.json) {
    Ok(sendControllerOutput())
  }
  def readCommand(value: JsValue): (String) ={
    val instruction = (value\"instruction").get.toString.replace("\"", "")
    if(instruction == "0"){
      val x = (value\"x").get.toString.replace("\"", "");
      val y = (value\"y").get.toString().replace("\"", "");
      layedX = x.toInt;
      layedY = y.toInt;
      return "i "+x+" "+y
    }
    instruction
  }
  def clicked(befehl:String): Unit ={
    controller.befehl = befehl
    println(befehl)
    Controllerstate = supervisor.newRoundactive()
    if(Controllerstate != 2){
      supervisor.otherplayer()
      supervisor.newRound()
    }
    //update website
  }
}
