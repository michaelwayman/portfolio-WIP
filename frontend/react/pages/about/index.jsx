import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import BGImage from '../../components/bgimage/index.jsx';


require('./styles.scss');


class AboutPage extends React.Component {

    render() {
        return (
            <section id="aboutPage">

                <ReactCSSTransitionGroup transitionName="bg"
                                         transitionEnter={false}
                                         transitionLeave={false}
                                         transitionAppear={true}
                                         transitionAppearTimeout={2500}>
                    <BGImage imgUrl={'images/landing2.png'} parallax={true} zIndex={2}/>
                </ReactCSSTransitionGroup>
                <div className="content">
                    <ReactCSSTransitionGroup transitionName="title"
                                             transitionEnter={false}
                                             transitionLeave={false}
                                             transitionAppear={true}
                                             transitionAppearTimeout={2500}>
                        <h1 className="title">software engineer</h1>
                    </ReactCSSTransitionGroup>
                    <ReactCSSTransitionGroup transitionName="description"
                                             transitionEnter={false}
                                             transitionLeave={false}
                                             transitionAppear={true}
                                             transitionAppearTimeout={2500}>
                        <p className="description">
                            <strong>Michael Wayman</strong> here. <br/><br/><br/>
                            This is my first time trying out ReactJS. Since then I have mastered it and even contributed
                            to Facebook's efforts in maintaining the ecosystem. Now that I am
                            <em> looking for work </em> again I think I will take this project back up and build it correctly 
                            in to a full blown portfolio/resume website.
                        </p>
                    </ReactCSSTransitionGroup>
                </div>
                <ReactCSSTransitionGroup transitionName="circle"
                                             transitionEnter={false}
                                             transitionLeave={false}
                                             transitionAppear={true}
                                             transitionAppearTimeout={3000}>
                        <div><div className="circle"></div></div>
                    </ReactCSSTransitionGroup>
            </section>
        )
    }
}

export default AboutPage