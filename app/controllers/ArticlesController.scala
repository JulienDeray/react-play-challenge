package controllers

import javax.inject._
import scala.util.matching.Regex


import articles.{Article, Articles}
import articles.Articles.{articleFormatter, newArticleForm}
import play.api.libs.json.Json
import play.api.mvc._

@Singleton
class ArticlesController @Inject() extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def getArticles = Action { implicit request =>
    val optAuthor = request.getQueryString("author")
    val optContent = request.getQueryString("content")
    val optTitle = request.getQueryString("title")

    val filteredArticles = Articles.getArticles
      .filter( article => optAuthor.fold(true)(author => article.author contains author))
      .filter( article => optContent.fold(true)(content => article.content contains content))
      .filter( article => optTitle.fold(true)(title => article.content contains title))

    Ok(Json.toJson(filteredArticles))
  }

  def newArticle = Action { implicit request =>
    newArticleForm.bindFromRequest.fold(
      _ => BadRequest,
      article => {
        Articles.addArticle(article)
        Ok("")
      }
    )
  }
}
