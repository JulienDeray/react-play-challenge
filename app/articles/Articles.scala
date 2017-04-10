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

  // NOTE: added bunch of hardcoded articles for easier checking of implemented features
  private var articles = List(
    Article(
      "First article",
      "Julien",
      """Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. """
    ),
    Article(
      "Second awesome blog post",
      "Miss Catapulte",
      """You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man."""
    ),
    Article(
      "Three",
      "Darth Vader",
      """I am your father!"""
    ),
    Article(
      "Four",
      "Luke Skywalker",
      """Noooooo!"""
    ),
    Article(
      "Five",
      "John Nada",
      """I have come here to chew bubblegum and kick ass... and I'm all out of bubblegum."""
    ),
    Article(
      "Six",
      "Leonidas",
      """This is Sparta!"""
    ),
    Article(
      "Seven",
      "Braveheart",
      """They may take our lives, but they'll never take our freedom!"""
    ),
    Article(
      "Eight",
      "Maximus",
      """My name is Maximus Decimus Meridius, commander of the Armies of the North, General of the Felix Legions and loyal servant to the true emperor, Marcus Aurelius. Father to a murdered son, husband to a murdered wife. And I will have my vengeance, in this life or the next."""
    ),
    Article(
      "Nine",
      "Han Solo",
      """Chewie, we're home."""
    ),
    Article(
      "Ten",
      "Harry Callahan",
      """Go ahead, make my day."""
    ),
    Article(
      "Eleven",
      "Leia",
      """Help me, Obi-Wan Kenobi. You're my only hope."""
    ),
    Article(
      "Twelve",
      "Terminator",
      """Hasta la vista, baby."""
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
      "content" -> nonEmptyText
    )(Article.apply)(Article.unapply)
  )
}

case class Article(title: String, author: String, content: String)
