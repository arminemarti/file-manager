import { cwd } from 'process';

export default function displayCurrentDirectory() {
  console.info(`You are currently in ${cwd()}`);
}
