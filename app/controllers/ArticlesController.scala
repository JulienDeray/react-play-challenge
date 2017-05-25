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
      .filter( article => optAuthor.fold(true)(author => article.author.toLowerCase contains author.toLowerCase))
      .filter( article => optContent.fold(true)(content => article.content.toLowerCase contains content.toLowerCase))
      .filter( article => optTitle.fold(true)(title => article.title.toLowerCase contains title.toLowerCase))

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
