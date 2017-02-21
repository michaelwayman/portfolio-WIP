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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat.
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