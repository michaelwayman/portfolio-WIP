import React from 'react';

import Prompt from './prompt.jsx';
import {commandFromString, execCommand} from './commands.jsx';

require('./styles.scss');

class HistoryItem extends React.Component {
    render() {
        return (
            <div>
                <pre>{'> ' + this.props.input}</pre>
                {this.props.output ? <pre style={{wordWrap: 'break-word'}}>{this.props.output}</pre>: ''}
            </div>
        )
    }
}

class ConsolePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: []
        };

        this.handleCommand = this.handleCommand.bind(this);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'initial';
    }

    getHistory() {
        const history = this.state.history;
        return history.map((historyItem, index) => {
            return (
                <HistoryItem key={index} input={historyItem.input} output={historyItem.output}/>
            )}
        );
    }

    handleCommand(event) {
        const command = commandFromString(event.target.value);
        const commandOutput = execCommand(command, this.state, this.props);
        const exitCode = commandOutput.exitCode;
        if (exitCode === -1) {
           return false;
        } else if (exitCode === 0) {
            this.state.history.push({input: command.commandString, output: commandOutput.output});
        }
        this.setState({});
        this.scrollToBottom();
        return commandOutput;
    }

    scrollToBottom() {
        let consolePage = document.getElementById("consolePage");
        consolePage.scrollTop = consolePage.scrollHeight
    }

    render() {
        return (
            <section id="consolePage">
                <div className="content">
                    <pre className="heading">Type 'help' for a list of commands</pre>
                    <div className="history">
                        {this.getHistory()}
                    </div>
                    <Prompt onCommand={this.handleCommand}/>
                </div>
            </section>
        )
    }
}

export default ConsolePage