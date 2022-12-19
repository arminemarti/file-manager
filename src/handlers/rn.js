import { rename } from 'fs/promises';
import { resolve, parse } from 'path';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';

export default async function handleRn([pathToFile, newFileName]) {
  try {
    if (/[\/\\]/g.test(newFileName)) throw new Error('Invalid new_file_name');

    pathToFile = resolve(pathToFile);
    const { dir } = parse(pathToFile);
    const pathFromFile = resolve(dir, newFileName);
    await rename(pathToFile, pathFromFile);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
