package controllers

import javax.inject._

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
    val optContent = request.getQueryString("content")
    val optAuthor = request.getQueryString("author")
    val optTitle = request.getQueryString("title")
    val optDate = request.getQueryString("date")

    val filteredArticles = Articles.getArticles
      .filter( article => optAuthor.fold(true)(author => author == article.author))
      .filter( article => optContent.fold(true)(content => content == article.author))
      .filter( article => optTitle.fold(true)(title => title == article.author))
      .filter( article => optDate.fold(true)(date => date == article.date))

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

