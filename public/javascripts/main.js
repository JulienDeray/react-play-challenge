// NOTE: currently it is advised to use ES6 classes as a replacement for older createClass.
// Babel is used anyway so it would not be a problem. Set is as a TODO for future.
// Also adding a build-step (Webpack) would be a good choice as app grows to split this file into smaller ones


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
           <div className="rpc-form">
               <p><label>Title:</label> <input type='text' value={this.state.title} onChange={this.handleTitleChange} /></p>
               <p><label>Author:</label> <input type='text' value={this.state.author} onChange={this.handleAuthorChange} /></p>
               <p><label>Content:</label> <textarea value={this.state.content} onChange={this.handleContentChange} /></p>
               <button onClick={this.postNewArticle}>Publish</button>
           </div>
        );
    }
});

const Article = React.createClass({
    render() {
        return (
           <div className="rpc-article">
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
            <div className="rpc-articles-list">
                { list }
            </div>
        );
    }
});

/**
 * Filter articles by a simple title partial match checking. TODO: Also the filter can be cleared.
 */
const FilterByTitle = React.createClass({
    getInitialState() {
        return {filterText: ""}
    },
    clearValue(event) {
        this.props.clearFilter(event);

        this.setState((prevState) => ({
            filterText: ""
        }));
    },
    updateValue(event) {
        var val = event.target.value;

        this.props.filter(event);

        this.setState((prevState) => ({
            filterText: val
        }));
    },
    render() {
        return (
            <div className="rpc-article-filter">
                 <input type="text" placeholder="Filter by title" value={this.state.filterText} onChange={this.updateValue} />
                 <button onClick={this.clearValue}>Clear</button>
            </div>
        );
    }
});

/**
 * TODO: Filter articles by simple title partial match checking. Also filter can be cleared.
 */
const ContentToggler = React.createClass({
    render() {
        return (
            <label className="rpc-filter-clear">
                <input type="checkbox" onChange={this.props.toggleContent} />
                <span>Toggle content</span>
            </label>
        );
    }
});

const ArticlesBox = React.createClass({
    render() {
        return (
            <div className='rpc-split-left'>
                <h1>Articles</h1>
                <div className="rpc-articles-settings">
                    <FilterByTitle articles={this.props.articles} filter={this.props.filter} clearFilter={this.props.clearFilter} />
                    <ContentToggler toggleContent={this.props.toggleContent} />
                </div>
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
            <div className='rpc-split-right'>
                <h1>New article</h1>
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
        // NOTE: added cache here to not make additional ajax call after filtering to rest articles list
        // More sofisticated mechanism could be used here in real scale application
        return { articles: [], articlesCache: [] };
    },
    getArticlesFromBackend() {
        $.ajax({
            url: '/api/articles',
            dataType: 'json',
            type: 'GET',
            success: function(articles) {
                this.setState((prevState) => ({
                    articles: articles,
                    articlesCache: articles
                }));
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
                const articles = this.state.articlesCache;
                this.setState((prevState) => ({
                    articles: articles.concat([newArticle]),
                    articlesCache: articles.concat([newArticle])
                }));
                //this.setState({ articlesCache: articles.concat([newArticle]) });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    /**
     * Simple partial match of title and typed phrase is used for filtering.
     */
    filterArticlesByTitle(event) {
        const articles = this.state.articlesCache;
        var title = event.target.value;

        this.setState((prevState) => ({
            articles: articles.filter((article) => {
                return (article.title.indexOf(title) !== -1)
            })
        }));
    },
    /**
     * Just for user convenience a helper to clear typed filter text.
     */
    clearTitleFilter(event) {
        const articles = this.state.articlesCache;
        var toggle = event.target.value;

        this.setState((prevState) => ({
            articles: articles
        }));
    },
    /**
     * TODO: Another convenience utility for easier scanning only article headers.
     */
    toggleContent(event) {
        console.log("TODO: toggle change: ");
    },
    render() {
        // NOTE: removed width & height calculations,
        // as it is not needed anymore,
        // moved to CSS and added basic responsivness
        return (
           <div className="rpc-app">
               <NewArticleBox postNewArticle={this.postNewArticle} />
               <ArticlesBox articles={this.state.articles} filter={this.filterArticlesByTitle} clearFilter={this.clearTitleFilter} />
           </div>
        );
    }
});

ReactDOM.render(
    <TopLevelBox />,
    document.getElementById('content')
);
