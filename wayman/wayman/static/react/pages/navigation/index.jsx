import React from 'react';

import {Nav, ItemFontAwesome} from '../../components/nav/index.jsx';

function scrollToElement(element, duration) {
    let rect = element.getBoundingClientRect();
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let elementY = rect.top + scrollTop - 79;
    let startingY = window.pageYOffset;
    let diff = elementY - startingY;
    let start;
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const percent = Math.min(time / duration, 1);
        window.scrollTo(0, startingY + diff * percent);
        if (time < duration) {
          window.requestAnimationFrame(step);
        }
    })
}

class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.state = {
            yPos: window.pageYOffset,
            navs: {
                socialMedia: {
                    classes: ['fixed', 'horizontal'],
                    styles: {top:16, right: 16},
                    links: [
                        {url: 'http://github.com', content: <ItemFontAwesome classes="fa fa-github-square fa-3x"/>},
                        {url: 'http://linkedin.com', content: <ItemFontAwesome classes="fa fa-linkedin-square fa-3x"/>}
                    ]
                },
                toolbar: {
                    classes: ['fixed', 'horizontal'],
                    styles: {bottom: 16, left: 16},
                    links: [
                        {url: '#console', content: <ItemFontAwesome classes="fa fa-terminal fa-3x" text="console"/>},
                    ]
                },
                bug: {
                    classes: ['fixed', 'horizontal'],
                    styles: {bottom: 16, right: 16},
                    links: [
                        {url: '#bug', content: <ItemFontAwesome style={{fontSize: 12}} classes="fa fa-bug fa-2x" text="report"/>},
                    ]
                }
            }
        };
    }

    componentDidMount() {
        this.scrollListener = window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener(this.scrollListener);
    }

    handleScroll() {
        if (!this.state.fixed && (window.pageYOffset > this.props.fixAt)) {
            this.setState({fixed: true});
        }
        else if (this.state.fixed && (window.pageYOffset < this.props.fixAt)) {
            this.setState({fixed: false});
        }
    }

    getLinkPositions() {
        let pos = {};
        this.props.navLinks.forEach((link) => {
            if (link.url[0] === '#') {
                let elementID = link.url.slice(1);
                let element = document.getElementById(elementID);
                let rect = element.getBoundingClientRect();
                let scrollTop = window.scrollY || document.documentElement.scrollTop;
                let elementY = rect.top + scrollTop - 79;
                pos[link.url] = elementY;
            }
        });
        console.log(pos);
        return pos;
    }

    buildNavs() {
        const navs = this.state.navs;
        return Object.keys(navs).map((nav, index) => {
            const links = navs[nav].links;
            const navItems = links.map((link, index) => {
                return <li key={index}><a href={link.url} onClick={this.handleLinkClick}>{link.content}</a></li>
            });
            return <Nav key={index} classes={navs[nav].classes} styles={navs[nav].styles} navItems={navItems}/>
        });
    }

    handleLinkClick(event) {
        this.props.onLinkClick(event);
    }

    render() {

        return (
            <nav>
                {this.buildNavs()}
            </nav>
        )
    }
}

export default Navigation