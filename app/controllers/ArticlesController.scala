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
//    val optAuthor = request.getQueryString("author")
//    val optContent = request.getQueryString("content")
//    val optTitle = request.getQueryString("title")
//    val optCategory = request.getQueryString("category")

    val elementSize:Option[Int] = toInt(request.getQueryString("size").get)
    val elementPage:Option[Int] = toInt(request.getQueryString("page").get)

    val filteredArticles = Articles.getArticles(elementSize.getOrElse(5), elementPage.getOrElse(0))
//      .filter( article => optAuthor.fold(true)(author => author == article.author))
//      .filter( article => optContent.fold(true)(content => content == article.author))
//      .filter( article => optTitle.fold(true)(title => title == article.author))
//      .filter( article => optCategory.fold(true)(category => category == article.category))

    Ok(Json.toJson(filteredArticles))
  }

  def getSearchedArticles = Action { implicit request =>
    val optAuthor = request.getQueryString("author")
    val optContent = request.getQueryString("content")
    val optTitle = request.getQueryString("title")
    val optCategory = request.getQueryString("category")

    val articleFilter = Article(optTitle.getOrElse(""), optAuthor.getOrElse(""), optCategory.getOrElse(""), optContent.getOrElse(""))

    val foundArticles = Articles.filterArticles(articleFilter);

    Ok(Json.toJson(foundArticles))

  }

  def newArticle = Action { implicit request =>
    newArticleForm.bindFromRequest.fold(
      _ => BadRequest,
      article => {
        Articles.addArticle(article)
        Ok("Article Added!!!")
      }
    )
  }

  def toInt(param: String) : Option[Int] = {
    try {
      Some(param.toInt)
    } catch {
      case e: Exception => None
    }
  }

}

