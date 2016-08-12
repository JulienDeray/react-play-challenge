
const ArticlesBox = React.createClass({
    render() {
        return (
            <div className='split-left'>
                <h1>Articles :</h1>
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