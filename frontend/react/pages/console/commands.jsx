
const helpCommand = {
    short: 'Show the available commands',
    handle: (args, state, props) => {
        let output = [];
        for (let key of Object.keys(commands)) {
            output.push(key + ' '.repeat(15 - key.length) + commands[key].short)
        }
        output.sort();
        return {
            output: output.join('\n'),
            exitCode: 0
        };
    }
};

const clearCommand = {
    short: 'Clear the console',
    handle: (args, state, props) => {
        state.history = [];
        return {output: '', exitCode: 1}
    }
};

const curlCommand = {
    short: 'Make HTTP request to the given URL',
    handle: (args, state, props) => {
        let xhttp = new XMLHttpRequest();
        // xhttp.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //       document.getElementById("demo").innerHTML = this.responseText;
        //     }
        // };
        xhttp.open("POST", "http://127.0.0.1:8000/api/curl/", false);
        xhttp.send(args);
        return {output: JSON.parse(xhttp.responseText).data, exitCode: 0}
    }
};

const echoCommand = {
    short: 'Outputs original input',
    handle: (args, state, props) => {
        return {
            output: args.join(' '),
            exitCode: 0
        }
    }
};

const exitCommand = {
    short: 'Close the console',
    handle: (args, state, props) => {
        props.closeConsole();
        return {output: '', exitCode: -1}
    }
};

const commands = {
    clear: clearCommand,
    curl: curlCommand,
    help: helpCommand,
    echo: echoCommand,
    exit: exitCommand
};

function execCommand(command, state, props) {
    const name = command.name;
    if (name in commands) {
        return commands[name].handle(command.args, state, props);
    } else if (name === '') {
        return {output: false, exitCode: 0};
    } else {
        return {
            output: `'${name}' is not a command.`,
            exitCode: 0
        }
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
