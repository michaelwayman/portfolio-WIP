import React from 'react';

import BGImage from '../../components/bgimage/index.jsx';

require('./styles.scss');


class AboutPage extends React.Component {
    render() {
        return (
            <section id="aboutPage">
                <BGImage imgUrl={'static/images/landing4.jpg/'} parallax={true}/>
                <div className="content">
                    <h1>about me</h1>
                </div>
            </section>
        )
    }
}

export default AboutPage