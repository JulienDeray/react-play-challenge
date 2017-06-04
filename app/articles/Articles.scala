package articles

import play.api.libs.json.Json
import play.api.data.Form
import play.api.data.Forms._

/**
  * @author : julienderay
  * Created on 12/08/2016
  */

object Articles {
  /**
    * Mutable objects are evil but would you prefer dealing with a database ? :)
    */

  implicit val articleFormatter = Json.format[Article]

  private var articles = List(
    Article(
      "First article",
      "Julien",
      "News",
      """Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. """
    ),
    Article(
      "Second awesome blog post",
      "Miss Catapulte",
      "News",
      """You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."""
    )
  )


  def filterArticles(articleFilter : Article): List[Article] = {
   val filteredArticles = articles
      .filter(articleItr =>
        (articleFilter.author == articleItr.author)
            || (articleFilter.category == articleItr.category)
            || (articleFilter.title == articleItr.title))

    return filteredArticles;
  }


  def getArticles(size: Int, page: Int) : List[Article] = {

    var next:Int = 0;

    next += (page+size);

    var elements = articles.slice(page,next);

    return elements

  }


  def addArticle(article: Article): Unit = {
    articles = articles :+ article
  }

  def newArticleForm = Form(
    mapping(
      "title" -> nonEmptyText,
      "author" -> nonEmptyText,
      "category" -> nonEmptyText,
      "content" -> nonEmptyText
    )(Article.apply)(Article.unapply)
  )
}

case class Article(title: String, author: String, category: String, content: String)