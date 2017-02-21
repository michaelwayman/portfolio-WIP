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

export {ItemFontAwesome}