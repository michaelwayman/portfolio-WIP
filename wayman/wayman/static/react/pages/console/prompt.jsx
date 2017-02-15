import React from 'react';

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
        return (
            <div id="cursor"
                 className={'cursor' + ((this.state.blink && this.props.cursorBlink) ? ' blink': '')}>
            </div>
        )
    }
}


class Prompt extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cursorBlink: true,
            cursorPos: 0,
            input: '',
            history: [],
            historyIndex: 0,
        };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);
    }

    handleKeyUp(event) {
        this.setState({cursorBlink: true});
    }

    handleKeyDown(event) {
        document.getElementById('promptInput').focus();

        const history = this.state.history;
        let historyIndex = this.state.historyIndex;

        const caretPos = event.target.selectionEnd;
        console.log(caretPos);
        console.log(event.target.selectionStart);
        switch (event.keyCode) {
            case 13:  // enter key (i.e. new command)
                event.preventDefault();
                let commandString = event.target.value;
                if (commandString) {
                    history.push(commandString);  // Add command to history
                }
                const success = this.props.onCommand(event);  // Bubble event to parent
                if (!success) {return false;}
                this.setState({cursorPos: 0, input: '', historyIndex: history.length, history: history});
                break;
            case 37:  // left arrow
                this.setState({cursorPos: caretPos === 0 ? 0 : caretPos - 1});
                break;
            case 38:  // up arrow
                if (this.state.history.length > 0) {
                    if (historyIndex > 0) historyIndex--;
                    console.log(history[historyIndex].length);
                    this.setState({input: history[historyIndex], historyIndex: historyIndex, cursorPos: caretPos});
                }
                break;
            case 39:  // right arrow
                this.setState({cursorPos: caretPos === event.target.value.length ? caretPos: caretPos + 1});
                break;
            case 40:  // up arrow
                historyIndex++;
                if (historyIndex < history.length) {
                    this.setState({input: history[historyIndex], historyIndex: historyIndex, cursorPos: caretPos});
                } else {
                    this.setState({input: '', cursorPos: 0, historyIndex: history.length});
                }
                break;
            default:
                break;
        }
        this.setState({cursorBlink: false})
    }

    handleOnChange(event) {
        this.setState({input: event.target.value, cursorPos: event.target.selectionEnd});
    }

    render() {
        return (
            <div className="prompt">
                <input type="text"
                       id="promptInput"
                       value={this.state.input}
                       onChange={this.handleOnChange}
                       spellCheck="false"
                       autoComplete="off"/>

                <pre className="input cursorPad">{'> ' + ' '.repeat(this.state.cursorPos)}</pre>
                <pre className="input top">{'> ' + this.state.input}</pre>
                <Cursor cursorBlink={this.state.cursorBlink}/>
            </div>
        )
    }
}

export default Prompt
