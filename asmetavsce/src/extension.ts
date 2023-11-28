// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from  'vscode';

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "asmetavsce" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('asmetaS.run', (file: string) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage(`${file}`);
		const terminal = vscode.window.createTerminal();
		terminal.show();
		terminal.sendText(`java -jar \$ASMETA_HOME/AsmetaS.jar "${String(file).replace('/\ /gi',"\\\ ").replace('/%20/gi',"\\\ ").split("://")[1]}"`);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
