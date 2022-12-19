import { chdir } from 'process';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';

export default async function handleUp() {
  try {
    chdir('..');
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
