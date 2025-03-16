"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
// Main class in the server jar
const main = 'org.asmeta.xt.ide.server.ServerLauncher&';
function activate(context) {
    const executable = path.join('java');
    const classPath = path.join(__dirname, '../src/org.asmeta.xt.ide-1.0.0-SNAPSHOT-ls.jar');
    console.log("path : " + classPath);
    // add-opens flag needed to bypass an error caused by reflective accesses in XText generated code
    const args = ['-Djava.awt.headless=true', '-jar', classPath];
    const serverOptions = {
        command: executable,
        args: [...args, main],
    };
    const clientOptions = {
        documentSelector: [{ scheme: 'file', language: 'asmeta' }]
    };
    client = new node_1.LanguageClient('asmetal-client', 'asmetal language', serverOptions, clientOptions);
    client.start().then(() => {
        // Adding the disposable to the subscriptions will close the server when the extension is deactivated
        context.subscriptions.push(client);
    });
    console.log('Extension "asmetavsce" is now active!');
    let asmetasRun = vscode.commands.registerCommand('asmetaS.run', (file) => {
        vscode.window.showInformationMessage(`Running Simulator on: ${file}`);
        const terminal = vscode.window.createTerminal("asmeta simulator", "bash");
        terminal.show();
        terminal.sendText(`java -jar ${path.join(__dirname, '../resources/AsmetaS.jar')} "${String(file).replace('/\ /gi', "\\\ ").replace('/%20/gi', "\\\ ").split("://")[1]}"`);
    });
    let asmetalcRun = vscode.commands.registerCommand('asmetaLc.run', (file) => {
        vscode.window.showInformationMessage(`Running Parser on: ${file}`);
        const terminal = vscode.window.createTerminal("asmeta parser", "bash");
        terminal.show();
        terminal.sendText(`java -jar ${path.join(__dirname, '../resources/AsmetaLc.jar')} "${String(file).replace('/\ /gi', "\\\ ").replace('/%20/gi', "\\\ ").split("://")[1]}"`);
    });
    let asmetasmvRun = vscode.commands.registerCommand('asmetaSMV.run', (file) => {
        vscode.window.showInformationMessage(`Running Model Checker on: ${file}`);
        const terminal = vscode.window.createTerminal("asmeta NuSMV", "bash");
        terminal.show();
        terminal.sendText(`java -jar ${path.join(__dirname, '../resources/AsmetaSMV.jar')} -kf -en "${String(file).replace('/\ /gi', "\\\ ").replace('/%20/gi', "\\\ ").split("://")[1]}"`);
    });
    context.subscriptions.push(asmetasRun);
    context.subscriptions.push(asmetalcRun);
    context.subscriptions.push(asmetasmvRun);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map