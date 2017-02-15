import React from 'react';

require('./styles.scss');

class SideBarItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <a href={this.props.url} onClick={this.props.handleClick}>
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

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        let url = event.currentTarget.getAttribute('href');
        switch (url) {
            default:
                this.props.handleLinkClick(event);
                break;
        }
    }

    render() {
        return (
            <aside id="sidebar">
                <ul>
                    <SideBarItem name="github"
                                 handleClick={this.handleClick}
                                 iconClass="fa fa-github fa-3x"
                                 url="http://github.com/michaelwayman"/>
                    <SideBarItem name="linkedin"
                                 handleClick={this.handleClick}
                                 iconClass="fa fa-linkedin-square fa-3x"
                                 url="http://linkedin.com/in/mwayman"/>
                    <SideBarItem name="console"
                                 handleClick={this.handleClick}
                                 iconClass="fa fa-terminal fa-3x"
                                 url="#console"/>
                </ul>
            </aside>
        )
    }

}

export default SideBar