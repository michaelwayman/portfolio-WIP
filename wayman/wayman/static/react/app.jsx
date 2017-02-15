import React from 'react';
import ReactDOM from 'react-dom';


import AboutPage from "./pages/about/index.jsx";
import ConsolePage from "./pages/console/index.jsx";
import Footer from "./components/footer/index.jsx";
import Nav from "./components/nav/index.jsx";
import ProjectsPage from './pages/projects/index.jsx';
import SideBar from "./components/sidebar/index.jsx";
import SkillsPage from './pages/skills/index.jsx';

require('./styles/styles.scss');

class App extends React.Component {

    constructor(props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleCloseConsole = this.handleCloseConsole.bind(this);

        this.state = {
            renderConsole: true
        }
    }

    getNavigation() {
        return [
            {name: 'about', url: '#aboutPage'},
            {name: 'skills', url: '#skillsPage'},
            {name: 'projects', url: '#projectsPage'}
        ];
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
                <Nav navLinks={this.getNavigation()} fixAt={720} />
                <SideBar handleLinkClick={this.handleLinkClick}/>
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
