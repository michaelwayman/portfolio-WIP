// Note: For this to work, .bgImg needs to have a parent with { position: relative }

import React from 'react';

require('./styles.scss');

class BGImage extends React.Component {

    render() {
        const style = {
            backgroundImage: `url("${this.props.imgUrl}")`,
            zIndex: this.props.zIndex || -1
        };

        if (this.props.parallax) style['backgroundAttachment'] = 'fixed';
        return <div className="bgImg" id={this.props.id} style={style}></div>
    }
}

export default BGImage
