package controllers

import play.api.Logger
import play.api.data.Form
import play.api.data.Forms.{text, optional, tuple, nonEmptyText}
import play.api.libs.json.JsString
import play.api.mvc.{Action, Security, Results}
import scala.Some
import security.Auth


/**
 * @author f.patin
 */
object Authentication extends BaseController {

	def login = Action {
		implicit request =>
			Ok(views.html.login())
	}

	val authenticateForm = Form(tuple(
		"username" -> nonEmptyText,
		"password" -> nonEmptyText,
		"redirect" -> optional(text)
	))

	def authenticate = Action {
		implicit request =>
			authenticateForm.bindFromRequest.fold(
				withErrors => BadRequest("KO"),
				loggedIn => {
					Async {
						Auth.checkAuthentication((loggedIn._1, loggedIn._2)).map {
							check =>
								check match {
									case Some(ok) => {
										loggedIn._3.map(next => Results.Redirect(routes.Application.index() + "#" + next))
											.getOrElse(Results.Redirect(routes.Application.index()))
											.withSession(request.session + (Security.username -> loggedIn._1))
									}
									case None => Results.Redirect(routes.Authentication.login())
										.withSession(request.session - Security.username)
										.flashing(("errormsg" -> "Utilisateur ou mot de passe incorrect"))
								}
						}.recover {
							case e =>
								Logger.error("authenticate", e)
								InternalServerError(JsString(s"exception ${e.getMessage}"))
						}
					}
				}
			)

	}

	def logout = Action {
		request =>
			Results.Redirect(routes.Authentication.login()).withSession(request.session - Security.username)
	}
}
