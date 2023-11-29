import * as vscode from  'vscode';

export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "asmetavsce" is now active!');

	let asmetasRun = vscode.commands.registerCommand('asmetaS.run', (file: string) => {
		vscode.window.showInformationMessage(`Running Simulator on: ${file}`);
		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(`java -jar \$ASMETA_HOME/AsmetaS.jar "${String(file).replace('/\ /gi',"\\\ ").replace('/%20/gi',"\\\ ").split("://")[1]}"`);
	});
	
	let asmetalcRun = vscode.commands.registerCommand('asmetaLc.run',(file: string) =>{
		vscode.window.showInformationMessage(`Running Parser on: ${file}`);
		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(`java -jar \$ASMETA_HOME/AsmetaLc.jar "${String(file).replace('/\ /gi',"\\\ ").replace('/%20/gi',"\\\ ").split("://")[1]}"`);
	})

	let asmetasmvRun = vscode.commands.registerCommand('asmetaSMV.run',(file: string) =>{
		vscode.window.showInformationMessage(`Running Model Checker on: ${file}`);
		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(`java -jar \$ASMETA_HOME/AsmetaSMV.jar -kf -en "${String(file).replace('/\ /gi',"\\\ ").replace('/%20/gi',"\\\ ").split("://")[1]}"`);
	})

	context.subscriptions.push(asmetasRun);
	context.subscriptions.push(asmetalcRun);
	context.subscriptions.push(asmetasmvRun);
}

export function deactivate() {}
