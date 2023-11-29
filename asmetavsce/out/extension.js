"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    console.log('Extension "asmetavsce" is now active!');
    let asmetasRun = vscode.commands.registerCommand('asmetaS.run', (file) => {
        vscode.window.showInformationMessage(`Running Simulator on: ${file}`);
        const terminal = vscode.window.createTerminal();
        terminal.show();
        terminal.sendText(`java -jar \$ASMETA_HOME/AsmetaS.jar "${String(file).replace('/\ /gi', "\\\ ").replace('/%20/gi', "\\\ ").split("://")[1]}"`);
    });
    let asmetalcRun = vscode.commands.registerCommand('asmetaLc.run', (file) => {
        vscode.window.showInformationMessage(`Running Parser on: ${file}`);
        const terminal = vscode.window.createTerminal();
        terminal.show();
        terminal.sendText(`java -jar \$ASMETA_HOME/AsmetaLc.jar "${String(file).replace('/\ /gi', "\\\ ").replace('/%20/gi', "\\\ ").split("://")[1]}"`);
    });
    let asmetasmvRun = vscode.commands.registerCommand('asmetaSMV.run', (file) => {
        vscode.window.showInformationMessage(`Running Model Checker on: ${file}`);
        const terminal = vscode.window.createTerminal();
        terminal.show();
        terminal.sendText(`java -jar \$ASMETA_HOME/AsmetaSMV.jar -kf -en "${String(file).replace('/\ /gi', "\\\ ").replace('/%20/gi', "\\\ ").split("://")[1]}"`);
    });
    context.subscriptions.push(asmetasRun);
    context.subscriptions.push(asmetalcRun);
    context.subscriptions.push(asmetasmvRun);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map