import readline from 'readline';
import type { CLICommand } from './command.js';
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';

export function getCommands(): Record<string, CLICommand> {
	return {
		exit: {
			name: "exit",
			description: "Exits the pokedex",
			callback: commandExit,
		},
		help:	{
			name: "help",
			description: "Lists available commands",
			callback: commandHelp
		}
	}
}

export function cleanInput(input: string): string[] {
  return input.trim().split(/\s+/).filter(Boolean);
}

export function startREPL(): void {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Pokedex > ',
  });

  rl.prompt();

  rl.on('line', (line) => {
  	const commands = getCommands();
	const words = cleanInput(line);

	if (words.length === 0) {
		rl.prompt();
		return;
	}

	const word = words[0].toLowerCase();


	if (commands[word]) {
		commands[word].callback(commands);
	} else {
		console.log('Unknown command.');
	}

	rl.prompt();
  });

  rl.on('close', () => {
    console.log('Exiting REPL. Goodbye!');
    process.exit(0);
  });
}

