"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "terminalrelativepath" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('terminalrelativepath.helloWorld', () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello World from TerminalRelativePath!');
    vscode.window.registerTerminalLinkProvider({
        provideTerminalLinks: (context, token) => {
            // Detect the first instance of the word "test" if it exists and linkify it
            //   const startIndex = (context.line as string).indexOf('../source/main.cpp');
            //   var regex = new RegExp('\.\..*cpp')
            //   var regex = new RegExp('.*:\\d+:')
            var regex = new RegExp('^\.\.(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$');
            const problemMatcher = context.line.match(regex);
            const startIndex = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.index;
            if (startIndex === undefined) {
                return [];
            }
            const message = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
            const severity = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
            const column = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
            const line = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
            const file = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
            const fileLength = file ? file.length + 2 : 0;
            const filePath = file ? vscode.workspace.rootPath + file : vscode.workspace.rootPath;
            // Return an array of link results, this example only returns a single link
            return [
                {
                    startIndex,
                    length: fileLength,
                    tooltip: filePath,
                    // You can return data in this object to access inside handleTerminalLink
                    data: filePath
                }
            ];
        },
        handleTerminalLink: (link) => {
            //   vscode.window.showInformationMessage(`Link activated (data = ${link.data})`);
            //   printDefinitionsForActiveEditor();
            vscode.commands.executeCommand('vscode.open', vscode.Uri.file(link.data));
        }
    });
    // });
    // context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map