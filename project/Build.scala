
import org.apache.commons.io.FileUtils
import sbt._
import Keys._
import play.Project._
import scala.collection.JavaConverters._

object ApplicationBuild extends Build {


  val appName = "cra-v2"

  val appVersion = FileUtils.readLines(new File("build.version"), "UTF-8").asScala.head

  val appDependencies = Seq(
    // Add your project dependencies here,
    javaCore,
    // Morphia & MongoDB
    "leodagdag" %% "play2-morphia-plugin" % "0.0.14",
    // security
    "be.objectify" %% "deadbolt-java" % "2.1-RC1",
    // email
    "org.apache.commons" % "commons-email" % "1.3.1",
    // PDF
    "com.itextpdf" % "itextpdf" % "5.4.0",
    "commons-io" % "commons-io" % "2.4",
    // security
    "be.objectify" %% "deadbolt-scala" % "2.1-RC1",
    // MongoDB
    "org.reactivemongo" %% "play2-reactivemongo" % "0.9",
    // Common collections
    "commons-collections" % "commons-collections" % "3.2.1"
  )

  val main = play.Project(appName, appVersion, appDependencies)
    .settings(
    scalaVersion := "2.10.1",
    scalacOptions ++= Seq("-feature")
  )
    .settings(
    lessEntryPoints <<= baseDirectory(appLessEntryPoints)
  )
    .settings(
    // Morphia & MongoDB
    resolvers += "LeoDagDag repository" at "http://leodagdag.github.com/repository/",
    // ReactiveMongo
    resolvers += "ReactiveMongo Snapshot" at "https://oss.sonatype.org/content/repositories/snapshots",
    // Deadbolt
    resolvers += Resolver.url("Objectify Play Repository", url("http://schaloner.github.com/releases/"))(Resolver.ivyStylePatterns),
    resolvers += Resolver.url("Objectify Play Snapshot Repository", url("http://schaloner.github.com/snapshots/"))(Resolver.ivyStylePatterns),
    checksums := Nil
  )

  // Only compile the bootstrap bootstrap.less file and any other *.less file in the stylesheets directory
  def appLessEntryPoints(base: File): PathFinder = (
    (base / "app" / "assets" / "stylesheets" ** "main.less")
    )

}
