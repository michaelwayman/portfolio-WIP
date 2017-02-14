import React from 'react';

require('./styles.scss');

class SideBarItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let url = event.currentTarget.getAttribute('href');
        if (url[0] === '#') {
            event.preventDefault();
            console.log(url);
        }
    }

    render() {
        return (
            <li>
                <a href={this.props.url} onClick={this.handleClick}>
                    <div>
                        <div className="icon"><i className={this.props.iconClass} aria-hidden="true"></i></div>
                        <div className="name">{this.props.name}</div>
                    </div>
                </a>
            </li>
        )
    }
}

class SideBar extends React.Component {

    render() {
        return (
            <aside id="sidebar">
                <ul>
                    <SideBarItem name="github" iconClass="fa fa-github fa-3x" url="http://github.com/michaelwayman"/>
                    <SideBarItem name="linkedin" iconClass="fa fa-linkedin-square fa-3x" url="http://linkedin.com/in/mwayman"/>
                    {/*<SideBarItem name="resume" iconClass="fa fa-file-text-o fa-3x"/>*/}
                    <SideBarItem name="console" iconClass="fa fa-terminal fa-3x" url="#console"/>
                </ul>
            </aside>
        )
    }

}

export default SideBar