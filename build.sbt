name := "SquareCastle_nopull"

version := "1.0"

lazy val `squarecastle_nopull` = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"

resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"

scalaVersion := "2.12.2"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice )
libraryDependencies += "org.scalactic" %% "scalactic" % "3.0.8"
libraryDependencies += "org.scalatest" %% "scalatest" % "3.0.8" % "test"
libraryDependencies += "junit" % "junit" % "4.8" % "test"
libraryDependencies += "org.scala-lang.modules" %% "scala-swing" % "2.1.1"
libraryDependencies += "com.google.inject" % "guice" % "4.1.0"

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )
libraryDependencies += "com.typesafe.play" %% "play-json" % "2.6.6"

libraryDependencies += "org.scala-lang.modules" %% "scala-xml" % "1.2.0"

libraryDependencies += "com.fasterxml.jackson.core" % "jackson-databind" % "2.2.2"
libraryDependencies += "com.fasterxml.jackson.module" %% "jackson-module-scala" % "2.2.2"