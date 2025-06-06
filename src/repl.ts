import readline from 'readline';

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

  rl.on('line', (line: string) => {
    const words = cleanInput(line);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    console.log(`Your command was: ${words[0].toLowerCase()}`);
    rl.prompt();
  });

  rl.on('close', () => {
    console.log('Exiting REPL. Goodbye!');
    process.exit(0);
  });
}

