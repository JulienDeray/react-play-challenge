let {Button, Navbar, Nav, NavItem, Glyphicon, Modal, InputGroup} = ReactBootstrap;

const Header = React.createClass({
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Mobillity</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="http://www.mobillity.co/">Our website</NavItem>
                    <NavItem eventKey={2} href="http://www.mobillity.co/our_story">Our story</NavItem>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        <SearchBar articleFilter={this.articleFilter} handleArticleFilterChange={this.props.handleArticleFilterChange}/>
                    </NavItem>
                    <NavItem eventKey={2} onClick={this.props.openModal}>Write a story !</NavItem>
                </Nav>
            </Navbar>
        );
    }
});

const NewArticleForm = React.createClass({
    getInitialState() {
        return { title: '', author: '', date: new Date().toISOString(), content: ''};
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
        this.props.closeModal();
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
               <p><i>By {this.props.author}</i><br/>
               {moment(this.props.date).fromNow()}</p>
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
                        date={article.date}
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
        var articles = this.props.articles.filter(article => article.title.toLowerCase().includes(this.props.articleFilter.toLowerCase().trim()));
        return (
            <div className='split-left'>
                <h1>Our last articles </h1>
                <ArticlesList articles={articles} />
                <hr />
                <h4>Articles are sponsored by <a href='http://slipsum.com'>SAMUEL L. IPSUM</a></h4>
            </div>
        );
    }
});

const ModalNewArticleBox = React.createClass({
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header>
                    <Modal.Title>Write a new story !</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewArticleForm postNewArticle={this.props.postNewArticle} closeModal={this.props.closeModal}/>
                </Modal.Body>
            </Modal>
        );
    }
});

const SearchBar = React.createClass({
    render() {
       return (
           <InputGroup>
               <Glyphicon glyph="search" />
               <input placeholder='Search articles' type='text' value={this.props.articleFilter} onChange={this.props.handleArticleFilterChange}/>
           </InputGroup>
       );
    }
});

const MainContainer = React.createClass({
    getInitialState() {
        return {
            articles: [],
            articleFilter: '',
        };
    },
    compareArticles(a1, a2){
        if(a1.date > a2.date)
            return -1;
        if(a1.date < a2.date)
            return 1;
        return 0;
    },
    componentDidMount() {
        this.getArticlesFromBackend()
    },
    getArticlesFromBackend() {
        $.ajax({
            url: '/api/articles',
            dataType: 'json',
            type: 'GET',
            success: function(articles) {
                this.setState({ articles: articles.sort(this.compareArticles) });
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
    render(){
        return(
            <div>
                <ArticlesBox articles={this.state.articles} articleFilter={this.props.articleFilter} />
                <ModalNewArticleBox showModal={this.props.showModal} closeModal={this.props.closeModal} postNewArticle={this.postNewArticle}/>
            </div>
        );
    }
});

const TopLevelBox = React.createClass({
    getInitialState() {
        return {
            articleFilter: "",
            showModal: false
        };
    },
    openModal(){
        this.setState({showModal: true});
    },
    closeModal(){
        this.setState({showModal: false});
    },
    handleArticleFilterChange(event) {
        this.setState({ articleFilter: event.target.value});
    },
    render() {
        const height = $(window).height();
        const width = $(window).width();

        return (
           <div style={{ height, width }}>
               <Header articleFilter={this.state.articleFilter} handleArticleFilterChange={this.handleArticleFilterChange} openModal={this.openModal}/>
               <MainContainer showModal={this.state.showModal} closeModal={this.closeModal} articleFilter={this.state.articleFilter}/>
           </div>
        );
    }
});

ReactDOM.render(
    <TopLevelBox />,
    document.getElementById('content')
);