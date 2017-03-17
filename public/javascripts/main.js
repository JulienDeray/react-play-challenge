
let {Button,Navbar,Grid,Row,Col,Nav,Input,NavItem,Thumbnail,DropdownButton,MenuItem,Glyphicon} = ReactBootstrap;

const NavBar = React.createClass({
    render(){
        let brand = <a href='/'>moBILLity blog</a>;
        return(
            <Navbar brand={brand} fixedTop>
                <Nav>
                    <NavItem eventKey={1} href="http://www.mobillity.co/">Home</NavItem>
                    <NavItem eventKey={2} href="http://www.mobillity.co/#learn-more">Learn More</NavItem>
                    <NavItem eventKey={3} href="http://www.mobillity.co/#contact-block">Contact Us</NavItem>
                </Nav>
            </Navbar>


        );
    }
});


const Modal = React.createClass({
    componentDidMount(){
        $(this.getDOMNode()).modal('show');
        $(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    },
    render(){
        return (
            <div className="modal fade">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title">New Article</h4>
                        </div>
                        <div className="modal-body">
                            <NewArticleBox postNewArticle={this.postNewArticle} />
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    propTypes:{
        handleHideModal: React.PropTypes.func.isRequired
    }
});

const Popup = React.createClass({
    getInitialState(){
        return {view: {showModal: false}}
    },
    handleHideModal(){
        this.setState({view: {showModal: false}})
    },
    handleShowModal(){
        this.setState({view: {showModal: true}})
    },
    render(){
        return(
            <div className="row">
                <button className="btn btn-default btn-block" onClick={this.handleShowModal}><Glyphicon glyph="plus"/> Let's Write!</button>
                {this.state.view.showModal ? <Modal handleHideModal={this.handleHideModal}/> : null}
            </div>
        );
    }
});

const Container = React.createClass({
    getInitialState() {
        return {
            selectedValue:'title',
            searchString: ''
        };
    },
    handleChange: function(e){
        this.setState({searchString:e.target.value});
    },
    handleSelect:function(e){
        this.setState({selectedValue:e.target.value});
    },
   render:function() {

       let art = this.props.items,
           searchString = this.state.searchString.trim().toLowerCase();

       if(searchString.length > 0){

           art = art.filter(function(i){
               return i.title.toLowerCase().match( searchString );
           });

       }
       return(
               <div className="grid">
                   <Grid>
                       <Row>
                           <Col md={6}></Col>
                           <Col xs={12} md={2}>
                               <input type="text" className="form-control" value={this.state.searchString} onChange={this.handleChange}  placeholder="Search" />
                           </Col>
                           <Col xs={12} md={2}>
                               <select className="form-control" value={this.state.selectedValue} onChange={this.handleSelect}>
                                   <option value="title">Title</option>
                                   <option value="newest">Newest</option>
                                   <option value="oldest">Oldest</option>
                               </select>
                           </Col>
                           <Col md={2}><Popup/></Col>
                       </Row>
                   </Grid>


                   <div className="grid-content">
                       <Grid>
                           <Row>
                               <ArticlesList articles={art} order={this.state.selectedValue}/>
                           </Row>
                       </Grid>
                   </div>




               </div>


       );
   }

});

const Footer = React.createClass({
   render(){
       return(


       <footer className="footer">
           <div className="container">
               <p className="text-muted">Articles are sponsored by <a href='http://slipsum.com'>SAMUEL L. IPSUM</a></p>
           </div>
       </footer>

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
                : <h2>No articles title</h2>;



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
                : <h2>No articles newest</h2>;
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
                : <h2>No articles oldest</h2>;
        }
        return (
            <div>
                { arr }
            </div>
        );
    }
});

const Article = React.createClass({
    render() {
        return (
        <Col xs={6} md={4}>
            <Thumbnail src="/assets/images/thumbnaildiv.png" alt="242x200">
                <h3>{this.props.title}</h3>
                <p>{this.props.author} / {this.props.date}</p>
                <p>
                    {this.props.content}
                </p>
            </Thumbnail>
        </Col>
        );
    }
});

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
        this.props.items(
            this.state,
            () => this.setState( this.getInitialState() )
        )
    },
    render() {
        return (

            <div className="form-group row-2">
                <label for="example-text-input" className="col-2 col-form-label">Title</label>
                <div className="col">
                    <input className="form-control" type="text" value={this.state.title} onChange={this.handleTitleChange}/>
                </div>
                <label for="example-text-input" className="col-2 col-form-label">Author</label>
                <div className="col">
                    <input className="form-control" type="text" value={this.state.author} onChange={this.handleAuthorChange}/>
                </div>
                <label for="example-text-input" className="col-2 col-form-label">Content</label>
                <div className="col">
                    <textarea className="form-control" id="exampleTextarea" rows="3" value={this.state.content} onChange={this.handleContentChange}></textarea>
                </div>
                <label for="example-date-input" className="col-2 col-form-label">Date</label>
                <div className="col">
                    <input className="form-control" type="date" value={this.state.date} onChange={this.handleDateChange}/>
                </div>
                <div className="col">
                    <button type="submit" className="btn btn-primary" onClick={this.postNewArticle}>Submit</button>
                </div>

            </div>

        );
    }
});

const NewArticleBox = React.createClass({
    render() {
        return (
                <NewArticleForm postNewArticle={this.props.postNewArticle} />
        );
    }
});

const Page = React.createClass({
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
    render(){
        return(


                <div>


                    <NavBar/>

                    <Container items={ this.state.articles }/>

                    <Footer/>

                </div>


        );
    }
});


React.render(<Page/>, document.getElementById('content'));


/*

 */