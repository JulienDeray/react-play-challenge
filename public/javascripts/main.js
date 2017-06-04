
const NewArticleForm = React.createClass({
    getInitialState() {
        return { title: '', author: '', content: '' , category : '' };
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
    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
    },
    postNewArticle() {
        this.props.postNewArticle(
            this.state,
            () => this.setState( this.getInitialState() )
        )
    },
    render() {
        return (
               <div className="form">
                   <p><label>Title : <input className="form-control" type='text' value={this.state.title} onChange={this.handleTitleChange} /></label></p>
                   <p><label>Author : <input className="form-control" type='text' value={this.state.author} onChange={this.handleAuthorChange} /></label></p>
                   <p><label>Category : <input className="form-control" type='text' value={this.state.category} onChange={this.handleCategoryChange} /></label></p>
                   <p><label>Content : <textarea className="form-control" value={this.state.content} onChange={this.handleContentChange} /></label></p>
                   <button className="btn btn-primary" onClick={this.postNewArticle}>Publish</button>
               </div>
        );
    }
});

const SearchArticleForm = React.createClass({

    getInitialState() {
            return { title: '', author: '', content: '' , category : '' };
        },
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    },
    handleAuthorChange(event) {
        this.setState({ author: event.target.value });
    },
    handleCategoryChange(event) {
        this.setState({ category: event.target.value });
    },
    getSearchArticle() {
        this.props.getSearchArticle(
            this.state,
            () => this.setState( this.getInitialState() )
        )
    },
    resetSearchArticle() {
              this.props.resetSearchArticle(
                  this.state,
                  () => this.setState( this.getInitialState() )
              )
    },
    render() {
       return (
            <div className="form">
                <p><label>Title : <input className="form-control" type='text' value={this.state.title} onChange={this.handleTitleChange} /></label></p>
                <p><label>Author : <input className="form-control" type='text' value={this.state.author} onChange={this.handleAuthorChange} /></label></p>
                <p><label>Category : <input className="form-control" type='text' value={this.state.category} onChange={this.handleCategoryChange} /></label></p>
                <button className="btn btn-primary" onClick={this.getSearchArticle}>Search</button>
                <button className="btn btn-danger" onClick={this.resetSearchArticle}>Reset</button>
            </div>
       );
    }
})

const Article = React.createClass({
    render() {
        return (
           <div>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>{this.props.title}</td>
                        </tr>
                        <tr>
                            <td>Author</td>
                            <td>{this.props.author}</td>
                        </tr>
                        <tr>
                            <td>Category</td>
                            <td>{this.props.category}</td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td>{this.props.content}</td>
                        </tr>
                    </tbody>
                </table>
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
                        category={article.category}
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

    resetPage() {
        this.props.page = 0;
    },
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    },
    handleScroll(event) {
        this.props.pageIncrement(this.props.limit)
        this.props.getArticlesFromBackend(this.props.limit,this.props.getPagePosition())
    },
    render() {
        return (
            <div className='col-md-9'>
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
            <div className="col-md-12">
                <h4>New article :</h4>
                <NewArticleForm postNewArticle={this.props.postNewArticle} />
            </div>
        );
    }
});

const SearchArticleBox = React.createClass({
    render() {
        return (
            <div className="col-md-12">
                <h4>Search article :</h4>
                <SearchArticleForm getSearchArticle={this.props.getSearchArticle} resetSearchArticle={this.props.resetSearchArticle} />
            </div>
        );
    }
});

const TopLevelBox = React.createClass({

    page : 0,
    limit: 5,
    componentDidMount() {
        this.getArticlesFromBackend(5,0)
    },
    getInitialState() {
        return { articles: [] };
    },
    getResetArticlesFromBackend(size, page) {
        $.ajax({
            url: '/api/articles',
            dataType: 'json',
            type: 'GET',
            data: {
                size : size,
                page : page
            },
            success: function(articles) {
                this.setState({ articles });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getArticlesFromBackend(size, page) {
        $.ajax({
            url: '/api/articles',
            dataType: 'json',
            type: 'GET',
            data: {
                size : size,
                page : page
            },
            success: function(articles) {
                this.setState({ articles : this.state.articles.concat(articles) });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getSearchArticle(searchArticle, successCallback) {
            $.ajax({
                url: '/api/articles/search',
                dataType: 'json',
                type: 'GET',
                data: searchArticle,
                success: function(articles) {
                    this.setState({ articles });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
    },
    resetSearchArticle() {
        this.getResetArticlesFromBackend(5,0)
    },
    pageIncrement(inc){
        this.page += inc;
    },
    getPagePosition(){
        return this.page;
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
           <div className="container">
                <div className="row">
                   <ArticlesBox articles={this.state.articles} getArticlesFromBackend={this.getArticlesFromBackend} page={this.page} limit={this.limit} pageIncrement={this.pageIncrement} getPagePosition={this.getPagePosition} />
                   <div className="col-md-3">
                      <div className="row">
                        <NewArticleBox postNewArticle={this.postNewArticle} />
                        <SearchArticleBox getSearchArticle={this.getSearchArticle} resetSearchArticle={this.resetSearchArticle} />
                      </div>
                   </div>
                </div>
           </div>
        );
    }
});

ReactDOM.render(
    <TopLevelBox />,
    document.getElementById('content')
);