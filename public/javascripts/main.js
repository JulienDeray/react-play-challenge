
const NewArticleForm = React.createClass({
    getInitialState() {
        return { title: '', author: '', content: '' };
    },
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },
    handleAuthorChange(event) {
        this.setState({ author: event.target.value });
    },
    handleContentChange(event) {
        this.setState({ content: event.target.value });
    },
    postNewArticle() {
        this.props.postNewArticle(
            this.state,
            () => this.setState( this.getInitialState() )
        )
    },
    render() {
        return (
           <div>
               <p>Title : <input type='text' value={this.state.title} onChange={this.handleTitleChange} /></p>
               <p>Author : <input type='text' value={this.state.author} onChange={this.handleAuthorChange} /></p>
               <p>Content : <textarea value={this.state.content} onChange={this.handleContentChange} /></p>
               <button onClick={this.postNewArticle}>Publish</button>
           </div>
        );
    }
});

const Article = React.createClass({
    render() {
        return (
           <div>
               <h3>{this.props.title}</h3>
               <p>Author: {this.props.author}</p>
               <p>{this.props.content}</p>
           </div>
        );
    }
});

const ArticlesList = React.createClass({
    render() {
        const list =
            this.props.articles.length
                ? this.props.articles.map(article =>
                    <Article
                        key={article.title}
                        title={article.title}
                        author={article.author}
                        content={article.content} />
                )
                : <h2>No articles</h2>;

        return (
            <div>
                { list }
            </div>
        );
    }
});

const ArticlesBox = React.createClass({
    render() {
        return (
            <div className='split-left'>
                <h1>Articles :</h1>
                <ArticlesList articles={this.props.articles} />
                <hr />
                <h4>Articles are sponsored by <a href='http://slipsum.com'>SAMUEL L. IPSUM</a></h4>
            </div>
        );
    }
});

const NewArticleBox = React.createClass({
    render() {
        return (
            <div className='split-right'>
                <h1>New article :</h1>
                <NewArticleForm postNewArticle={this.props.postNewArticle} />
            </div>
        );
    }
});

const TopLevelBox = React.createClass({
    componentDidMount() {
        this.getArticlesFromBackend()
    },
    getInitialState() {
        return { articles: [] };
    },
    getArticlesFromBackend() {
        $.ajax({
            url: '/api/articles',
            dataType: 'json',
            type: 'GET',
            success: function(articles) {
                this.setState({ articles });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    postNewArticle(newArticle, successCallback) {
        $.ajax({
            url: '/api/articles/new',
            type: 'POST',
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(newArticle),
            success: function() {
                successCallback();
                const articles = this.state.articles;
                this.setState({ articles: articles.concat([newArticle]) });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render() {
        const height = $(window).height();
        const width = $(window).width();

        return (
           <div style={{ height, width }}>
               <ArticlesBox articles={this.state.articles} />
               <NewArticleBox postNewArticle={this.postNewArticle} />
           </div>
        );
    }
});

ReactDOM.render(
    <TopLevelBox />,
    document.getElementById('content')
);