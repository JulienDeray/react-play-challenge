React.js + Play! 2 / Scala Challenge
====================================

## Introduction

Here is the code of an application that lists articles and lets the user publish new ones.

An article is made of a `title`, an `author` and a `content`. They are stored in the server in the singleton `articles.Articles` in a mutable `List`.

When the page is loaded, the component called `TopLevelBox` calls the server (`GET /api/articles`) to get the list of articles and passes it down the way to display it.

When a new article is published, `TopLevelBox` sends the data to the server (`POST /api/articles/new`) and adds it to the list.

## Run the code

- Install JDK 8
- Install Java
- Install the last version of Play! 2
- Run the server by running `activator run` at the root of the exercise's folder
- Open your favorite web browser at `http://localhost:9000`

## The exercise

1) If our application is successful, the number of articles will be too huge so that the user will probably want to filter them. 
It is your turn to figure out a way to filter the articles, by title first. You can add more features if you think it could improve the efficiency or the UX, be creative! 

2) Improve whatever you want, any good idea can improve the user's experience ;)

Don't overdo it, just think about what you would do if you were in this case working at Mobillity. Keep it simple but answer the need of the user.

Fork the repository and send a pull request when you are done.
 
## Why this exercise ?

This exercise should not take more than 24h, you will probably have to learn a lot though. 
None of the developers at Mobillity knew neither React.js nor Play! nor Scala when they arrived.
However, after a couple of weeks they were already very efficient. 
We set up this challenge not to test your level on these languages but to test your level at learning.
   
### Documentations :

- React.js : https://facebook.github.io/react/
- Play! 2 (Scala) : https://www.playframework.com/documentation/2.5.x/ScalaHome
- Scala : http://www.scala-lang.org/documentation/