package controllers

import javax.inject._

import articles.Articles
import articles.Articles.articleFormatter
import play.api.libs.json.Json
import play.api.mvc._

@Singleton
class ArticlesController @Inject() extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def getArticles = Action {
    Ok(Json.toJson(Articles.getArticles))
  }
}

