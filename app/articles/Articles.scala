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
      "2016-12-17",
      """Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. """
    ),
    Article(
      "Second awesome blog post",
      "Miss Catapulte",
      "2016-12-16",
      """You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."""
    ),
    Article(
      "React",
      "Nevzat",
      "2016-12-10",
      """Do you see any Teletubbies in here? Do you see a slender plastic tag clipped to my shirt with my name printed on it? Do you see a little Asian child with a blank expression on his face sitting outside on a mechanical helicopter that shakes when you put quarters in it? No? Well, that's what you see at a toy store. And you must think you're in a toy store, because you're here shopping for an infant named Jeb."""
    )
  )

  def getArticles = articles

  def addArticle(article: Article): Unit = {
    articles = articles :+ article
  }

  def newArticleForm = Form(
    mapping(
      "title" -> nonEmptyText,
      "author" -> nonEmptyText,
      "date" -> nonEmptyText,
      "content" -> nonEmptyText
    )(Article.apply)(Article.unapply)
  )
}

case class Article(title: String, author: String, date: String, content: String)