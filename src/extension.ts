import path = require('path');
import * as vscode from  'vscode';

import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions
} from 'vscode-languageclient/node';

let client: LanguageClient;

// Main class in the server jar
const main: string = 'org.asmeta.xt.ide.server.ServerLauncher&';

export function activate(context: vscode.ExtensionContext) {

    const executable: string = path.join('java');
    const classPath: string = path.join(__dirname,'../src/org.asmeta.xt.ide-1.0.0-SNAPSHOT-ls.jar');
    console.log("path : " + classPath)
    // add-opens flag needed to bypass an error caused by reflective accesses in XText generated code
    const args: string[] = ['-Djava.awt.headless=true','-jar', classPath];
    
    const serverOptions: ServerOptions = {
        command: executable,
        args: [...args, main],
    }
    

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'asmeta' }]
    };

    client = new LanguageClient(
        'asmetal-client',
        'asmetal language',
        serverOptions,
        clientOptions
    )

    client.start().then(() => {
        // Adding the disposable to the subscriptions will close the server when the extension is deactivated
        context.subscriptions.push(client);
    });

	console.log('Extension "asmetavsce" is now active!');

	let asmetasRun = vscode.commands.registerCommand('asmetaS.run', (file: string) => {
		vscode.window.showInformationMessage(`Running Simulator on: ${file}`);
		const terminal = vscode.window.createTerminal("asmeta simulator","bash");
		terminal.show();
		terminal.sendText(`java -jar ${path.join(__dirname,'../resources/AsmetaS.jar')} "${String(file).replace('/\ /gi',"\\\ ").replace('/%20/gi',"\\\ ").split("://")[1]}"`);
	});
	
	let asmetalcRun = vscode.commands.registerCommand('asmetaLc.run',(file: string) =>{
		vscode.window.showInformationMessage(`Running Parser on: ${file}`);
		const terminal = vscode.window.createTerminal("asmeta parser","bash");
		terminal.show();
		terminal.sendText(`java -jar ${path.join(__dirname,'../resources/AsmetaLc.jar')} "${String(file).replace('/\ /gi',"\\\ ").replace('/%20/gi',"\\\ ").split("://")[1]}"`);
	})

	let asmetasmvRun = vscode.commands.registerCommand('asmetaSMV.run',(file: string) =>{
		vscode.window.showInformationMessage(`Running Model Checker on: ${file}`);
		const terminal = vscode.window.createTerminal("asmeta NuSMV","bash");
		terminal.show();
		terminal.sendText(`java -jar ${path.join(__dirname,'../resources/AsmetaSMV.jar')} -kf -en "${String(file).replace('/\ /gi',"\\\ ").replace('/%20/gi',"\\\ ").split("://")[1]}"`);
	})

	context.subscriptions.push(asmetasRun);
	context.subscriptions.push(asmetalcRun);
	context.subscriptions.push(asmetasmvRun);
}

export function deactivate() {}
