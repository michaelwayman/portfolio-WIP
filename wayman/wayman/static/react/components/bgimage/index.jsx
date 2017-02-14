import React from 'react';

require('./styles.scss');

class BGImage extends React.Component {

    render() {
        const style = {backgroundImage: 'url("' + this.props.imgUrl + '")'};
        if (this.props.parallax) style['backgroundAttachment'] = 'fixed';
        return <div className="bgImg" style={style}></div>
    }
}

export default BGImage
