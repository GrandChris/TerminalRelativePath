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
    // Display a message box to the user
    // vscode.window.showInformationMessage('Hello World from TerminalRelativePath!');
    vscode.window.registerTerminalLinkProvider({
        provideTerminalLinks: (context, token) => {
            var regex1 = new RegExp('^\.\.(.*):(\\d+):(\\d+):\\s+(warning|error):\\s+(.*)$');
            var problemMatcher = context.line.match(regex1);
            var startIndex = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.index;
            var message = undefined;
            var severity = undefined;
            var column = undefined;
            var line = undefined;
            var file = undefined;
            if (startIndex !== undefined) {
                message = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
                severity = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
                column = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
                line = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
                file = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
            }
            else {
                // try different regex
                var regex2 = new RegExp('^\.\.(.*?):.*$');
                problemMatcher = context.line.match(regex2);
                startIndex = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.index;
                if (startIndex === undefined) {
                    return [];
                }
                file = problemMatcher === null || problemMatcher === void 0 ? void 0 : problemMatcher.pop();
            }
            // assign link variables
            const fileLength = file ? file.length + 2 : 0;
            const columnLength = column ? column.length + 1 : 0;
            const lineLength = line ? line.length + 1 : 0;
            const length = fileLength + columnLength + lineLength;
            const filePath = file ? vscode.workspace.rootPath + file : vscode.workspace.rootPath;
            const tooltipPath = filePath ? filePath + ":" : "";
            const tooltipLine = line ? line + ":" : "";
            const tooltipColumn = column ? column + ":" : "";
            const tooltip = tooltipPath + tooltipLine + tooltipColumn;
            const line_n = line ? +line - 1 : undefined;
            const column_n = column ? +column - 1 : undefined;
            // Return an array of link results, this example only returns a single link
            return [
                {
                    startIndex,
                    length: length,
                    tooltip: tooltip,
                    // You can return data in this object to access inside handleTerminalLink
                    filePath: filePath,
                    line: line_n,
                    column: column_n
                }
            ];
        },
        handleTerminalLink: (link) => {
            //   vscode.window.showInformationMessage(`Link activated (data = ${link.data})`);
            //   printDefinitionsForActiveEditor();
            if (link.line !== undefined) {
                const start = new vscode.Position(link.line, link.column);
                const end = new vscode.Position(link.line, link.column);
                const range = new vscode.Range(start, end);
                const opts = {
                    selection: range
                };
                vscode.commands.executeCommand('vscode.open', vscode.Uri.file(link.filePath), opts);
            }
            else {
                vscode.commands.executeCommand('vscode.open', vscode.Uri.file(link.filePath));
            }
        }
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map