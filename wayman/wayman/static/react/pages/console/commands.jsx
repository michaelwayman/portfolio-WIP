
const helpCommand = {
    short: 'Show the available commands',
    handle: (args, state, props) => {
        let output = [];
        for (let key of Object.keys(commands)) {
            output.push(key + ' '.repeat(15 - key.length) + commands[key].short)
        }
        output.sort();
        return output.join('\n');
    }
};

const clearCommand = {
    short: 'Clear the console',
    handle: (args, state, props) => {
        state.history = [];
        return true;
    }
};

const exitCommand = {
    short: 'Close the console',
    handle: (args, state, props) => {
        props.closeConsole();
    }
};

const commands = {
    clear: clearCommand,
    help: helpCommand,
    exit: exitCommand
};

function execCommand(command, state, props) {
    const name = command.name;
    if (name in commands) {
        return commands[name].handle(command.args, state, props);
    } else if (name === '') {
        return true;
    } else {
        return `'${name}' is not a command.`
    }
}

function commandFromString(string) {
    let returnDict = {};
    let args = string.replace(/[\t\n\r]/g, '').split(' ');
    let hasQuotes = false;
    let currentArg = [];
    let returnArgs = [];
    for (let arg of args) {
        if (arg.match('\"|\'')) {hasQuotes  = !hasQuotes;}
        currentArg.push(arg);
        if (!hasQuotes) {
            returnArgs.push(currentArg.join(' ').replace(/['"]+/g, ''));
            currentArg = [];
        }
    }
    returnDict['name'] = returnArgs[0];
    returnDict['args'] = returnArgs.slice(1);
    returnDict['commandString'] = string;
    console.log(returnDict);
    return returnDict
}

export {commandFromString, execCommand};
