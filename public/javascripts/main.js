
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
    getInitialState() {
        return { articles: [] };
    },
    componentDidMount() {
        this.getArticlesFromBackend()
    },
    getArticlesFromBackend() {
        $.ajax({
            url: this.props.url,
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
    render() {
        const list =
            this.state.articles.length
                ? this.state.articles.map(article =>
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
                <ArticlesList url='/api/articles' />
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
            </div>
        );
    }
});

const TopLevelBox = React.createClass({
    render() {
        const height = $(window).height();
        const width = $(window).width();

        return (
           <div style={{ height, width }}>
               <ArticlesBox />
               <NewArticleBox />
           </div>
        );
    }
});

ReactDOM.render(
    <TopLevelBox />,
    document.getElementById('content')
);