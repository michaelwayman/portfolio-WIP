import React from 'react';

require('./styles.scss');

class ItemFontAwesome extends React.Component {
    render() {
        return (
            <div style={this.props.style}>
                <i className={this.props.classes} aria-hidden="true"/>
                <div>{this.props.text}</div>
            </div>
        )
    }
}

class Nav extends React.Component {

    render() {
        return (
            <nav className={'nav ' + this.props.classes.join(' ')} style={this.props.styles}>
                <ul>
                    {this.props.navItems}
                </ul>
            </nav>
        )
    }
}

export {Nav, ItemFontAwesome}