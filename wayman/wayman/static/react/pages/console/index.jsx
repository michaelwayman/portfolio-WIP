import React from 'react';

require('./styles.scss');


class Cursor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {blink: false};
        this.blinkCursor = this.blinkCursor.bind(this);
    }

    componentDidMount() {
        this.blinkCursor()
    }

    componentWillUnmount() {
        clearInterval(this.blinkTimer)
    }

    blinkCursor() {
        this.blinkTimer = setInterval( () => {
            this.setState({blink: !this.state.blink});
        }, 400);
    }

    render() {
        return <div id="cursor" className={'cursor' + ((this.state.blink && this.props.cursorBlink) ? ' blink': '')}></div>
    }
}


class Prompt extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const input = this.props.input;
        const cursorInput = this.props.cursorInput;
        return (
            <div className="prompt">
                <pre className="input top">{input}</pre>
                <pre className="input">{cursorInput}</pre>
                <Cursor cursorBlink={this.props.cursorBlink}/>
            </div>
        )
    }
}


class ConsolePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cursorBlink: true,
            cursorInput: '',
            input: '',
            history: []
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress);
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);

        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);

        document.body.style.overflow = 'initial';
    }

    handleKeyUp(event) {
        this.setState({cursorBlink: true});
    }

    handleKeyDown(event) {
        console.log(event.keyCode);
        let newInput = this.state.cursorInput;
        switch (event.keyCode) {
            case 37:  // left
                newInput = newInput.slice(0, newInput.length - 1);
                break;
            case 39:  // right
                newInput += this.state.input[newInput.length] || '';
                break;
            case 32:
                break;
            default:
                break;
        }
        this.setState({cursorInput: newInput, cursorBlink: false});
    }

    handleKeyPress(event) {
        event.preventDefault();
        switch (event.keyCode) {
            case 8:
                var firstHalf = this.state.cursorInput.slice(0, this.state.cursorInput.length - 1);
                var secondHalf = this.state.input;
                var newInput = firstHalf + secondHalf.slice(firstHalf.length + 1, secondHalf.length);
                this.setState({input: newInput, cursorInput: firstHalf});
                break;
            case 13:
                console.log(13);
                const history = this.state.history;
                history.push(this.state.input);
                this.setState({
                    history: history,
                    input: '',
                    cursorInput: ''
                });
                break;
            default:
                var char = String.fromCharCode(event.keyCode);
                var firstHalf = this.state.cursorInput + char;
                var secondHalf = this.state.input;
                var newInput = firstHalf + secondHalf.slice(firstHalf.length - 1, secondHalf.length);
                this.setState({input: newInput, cursorInput: firstHalf});
        }
        console.log(event.keyCode);
    }

    getHistory() {
        const history = this.state.history;
        return history.map((item, index) => {
            return (
                <pre key={index}>{item}</pre>
            )}
        );
    }

    render() {
        return (
            <section id="consolePage">
                <div className="content">
                    <pre className="heading">Type 'help' for a list of commands</pre>
                    <div className="history">
                        {this.getHistory()}
                    </div>
                    <Prompt input={this.state.input}
                            cursorInput={this.state.cursorInput}
                            cursorBlink={this.state.cursorBlink}/>
                </div>
            </section>
        )
    }
}

export default ConsolePage