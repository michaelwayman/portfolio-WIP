import React from 'react';

require('./styles.scss');

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

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {yPos: window.pageYOffset};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick(event) {
        this.getLinkPositions();

        let url = event.target.getAttribute('href');
        if (url[0] === '#') {
            event.preventDefault();
            url = url.slice(1);
            let element = document.getElementById(url);
            scrollToElement(element, 500);
        }
    }

    buildNavItems() {
        const navLinks = this.props.navLinks;
        return navLinks.map((link, index) => {
            return (
                <li key={index}><a href={link.url} onClick={this.handleClick}>{link.name}</a></li>
            )}
        );
    }

    render() {
        const className = this.state.fixed ? 'fixed': '';
        const style = this.state.fixed ? {}: {top: this.props.fixAt};
        return (
            <nav id="nav" className={className} style={style}>
                <ul>
                    {this.buildNavItems()}
                </ul>
            </nav>
        )
    }
}

export default NavBar