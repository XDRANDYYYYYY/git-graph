// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "git-graph" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('git-graph.helloWorld', async function () {
		const gitExtension = vscode.extensions.getExtension('vscode.git')?.exports;
		if (!gitExtension) {
			vscode.window.showErrorMessage("No git extension detected")
			return;
		}
		const git = gitExtension.getAPI(1);
		const list = [];
		for (const i of git.recentRepositories) {
			const j = {
				label: i.rootUri.fsPath,
				uri: i.rootUri,
			};
			list.push(j);
		}
		const selected = await vscode.window.showQuickPick(list);
		console.log(selected);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
