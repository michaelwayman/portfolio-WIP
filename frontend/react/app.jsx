import React from 'react';
import ReactDOM from 'react-dom';


import AboutPage from "./pages/about/index.jsx";
import ConsolePage from "./pages/console/index.jsx";
import Navigation from "./pages/navigation/index.jsx";

require('./styles/styles.scss');

class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleCloseConsole = this.handleCloseConsole.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            renderConsole: false
        }
    }

    componentDidMount() {
        this.scrollListener = window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener(this.scrollListener);
    }

    handleScroll() {
        if (!this.state.fixed && (window.pageYOffset > this.props.fixAt)) {
            this.setState({fixed: true});
        }
        else if (this.state.fixed && (window.pageYOffset < this.props.fixAt)) {
            this.setState({fixed: false});
        }
    }

    handleLinkClick(event) {
        let url = event.currentTarget.getAttribute('href');

        switch(url) {
            case '#console':
                event.preventDefault();
                this.setState({renderConsole: !this.state.renderConsole});
                break;
        }
    }

    handleCloseConsole() {
        this.setState({renderConsole: false});
    }

    render() {
        return (
            <div id="app">
                <Navigation onLinkClick={this.handleLinkClick}/>
                {this.state.renderConsole ? <ConsolePage closeConsole={this.handleCloseConsole}/>: ''}
                <AboutPage/>
            </div>
        )
    }
}

const app = <App/>;
ReactDOM.render(
  app,
  document.getElementById('reactEntry')
);
