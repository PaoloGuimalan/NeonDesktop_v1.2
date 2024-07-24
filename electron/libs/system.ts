import { exec } from 'child_process';

function commandLineExec(command: string, callback: (result: string) => void) {
  exec(command, (__, stdout) => {
    callback(stdout);
  });
}

export { commandLineExec };
