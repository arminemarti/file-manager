import { open } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';

export default async function handleAdd([newFileName]) {
  let filehandle;
  try {
    const pathToFile = resolve(cwd(), newFileName);
    filehandle = await open(pathToFile, 'w');
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  } finally {
    filehandle?.close();
  }
}
