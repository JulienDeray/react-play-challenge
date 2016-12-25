const NewArticleForm = React.createClass({
    getInitialState() {
        return { title: '', author: '', content: '' ,date:''};
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
    handleDateChange(event) {
        this.setState({ date: event.target.value });
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
            <table>
                <tr>
                    <td>Title :</td>
                    <td><input type='text' value={this.state.title} onChange={this.handleTitleChange}/></td>
                </tr>

                <tr>
                    <td>Author :</td>
                    <td><input type='text' value={this.state.author} onChange={this.handleAuthorChange} /></td>
                </tr>

                <tr>
                    <td>Content :</td>
                    <td><textarea value={this.state.content} onChange={this.handleContentChange} /></td>
                </tr>
                <tr>
                    <td>Date: </td>
                    <td><input type="date" value={this.state.date} onChange={this.handleDateChange} /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><button onClick={this.postNewArticle}>Publish</button></td>
                </tr>
            </table>

        </div>
    );
    }
});

const Article = React.createClass({
    render() {
        return (
            <div>
            <h3>{this.props.title}</h3>
        <p>Author: {this.props.author} , Date: {this.props.date}</p>
        <p>{this.props.content}</p>
        </div>
    );
    }
});

const ArticlesList = React.createClass({
    render() {
        const order = this.props.order;

        let arr = this.props.articles;


        if(order=='title'){

            arr.sort(function (a, b) {
                if (a.title > b.title) {
                    return 1;
                }
                if (a.title < b.title) {
                    return -1;
                }

                return 0;
            });

            arr = arr.length
                ? arr.map(article =>
                <Article
                key={article.title}
            title={article.title}
            author={article.author}
            date={article.date}
            content={article.content}

        />
        )
        : <h2>No articles</h2>;



        }
        else if (order=='newest') {
            arr.sort(function (a, b) {
                if (a.date > b.date) {
                    return -1;
                }
                if (a.date < b.date) {
                    return 1;
                }

                return 0;
            });

            arr = arr.length
                ? arr.map(article =>
                <Article
                key={article.title}
            title={article.title}
            author={article.author}
            date={article.date}
            content={article.content}

        />
        )
        : <h2>No articles</h2>;
        }
        else if(order=='oldest'){
            arr.sort(function (a, b) {
                if (a.date > b.date) {
                    return 1;
                }
                if (a.date < b.date) {
                    return -1;
                }

                return 0;
            });

            arr = arr.length
                ? arr.map(article =>
                <Article
                key={article.title}
            title={article.title}
            author={article.author}
            date={article.date}
            content={article.content}

        />
        )
        : <h2>No articles</h2>;
        }
        return (
            <div>
            { arr }
            </div>
    );
    }
});

const ArticlesBox = React.createClass({
    getInitialState:function(){
        return {selectValue:'title'};
    },
    handleChange:function(e){
        this.setState({selectValue:e.target.value});
    },

    render() {
        return (
            <div className='split-left'>
                <div className="top-banner">
                    <div className="top-banner-left">
                        <h1>Articles :</h1>
                    </div>
                    <div className="top-banner-right">
                    <label>
                    Order By:
                    <select id="order" value={this.state.selectValue} onChange={this.handleChange}>
                        <option value="title">Title</option>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    </label>
                    </div>
            </div>
            <ArticlesList articles={this.props.articles} order={this.state.selectValue}/>

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