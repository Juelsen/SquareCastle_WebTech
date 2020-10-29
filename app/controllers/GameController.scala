package controllers
import aview.TUI.TUI
import gamecontrol.supervisor.supervisor
import gamecontrol.controller.Controller


class GameController {

  val supervisor:supervisor = new supervisor;
  val controller:Controller = new Controller;
  val C = scala.main.c;
  val tui:TUI = new TUI;
/*
  def index = Action {
    Result(
      header = ResponseHeader(200, Map.empty),
      body = HttpEntity.Strict(ByteString("Hello world!"), Some("text/plain"))
    )
  }*/
}
