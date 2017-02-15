import React from 'react';
import ReactDOM from 'react-dom';


import AboutPage from "./pages/about/index.jsx";
import ConsolePage from "./pages/console/index.jsx";
import Footer from "./components/footer/index.jsx";
import Navigation from "./pages/navigation/index.jsx";
import ProjectsPage from './pages/projects/index.jsx';
import SkillsPage from './pages/skills/index.jsx';

require('./styles/styles.scss');

class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleCloseConsole = this.handleCloseConsole.bind(this);

        this.state = {
            renderConsole: false
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
                <SkillsPage/>
                <ProjectsPage/>
                <Footer/>
            </div>
        )
    }
}

const app = <App/>;
ReactDOM.render(
  app,
  document.getElementById('reactEntry')
);
