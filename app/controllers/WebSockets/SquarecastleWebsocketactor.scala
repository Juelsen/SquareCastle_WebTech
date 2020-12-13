/*package controllers.WebSockets

import akka.actor.{Actor, ActorRef}
import gamecontrol.supervisor.supervisor
import play.api.libs.json.{JsValue, Json}
import controllers.GameController
class SquarecastleWebsocketactor (out: ActorRef, supervisor: supervisor) extends WebsocketsTrait{
  listenTo(supervisor)
  reactions += { case event: Any => sendJson(supervisor) }

  override def receive: Actor.Receive = {
    case msg: JsValue => {
      val data = readCommand(request.body)
      if(data != "init")
        clicked(data)
    }
  }
  override def sendJson(supervisor: supervisor): Unit = out ! (sendControllerOutput())

}*/
