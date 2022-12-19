import { createReadStream, createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import { parse, resolve } from 'path';
import { pipeline } from 'stream/promises';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';
import isDirectory from '../helpers/isDirectory.js';

export default async function handleMv([pathToFile, pathToNewDirectory]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToNewDirectory));

    if (isNotDirectory) throw new Error('Invalid path_to_new_directory.');

    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    pathToNewDirectory = resolve(pathToNewDirectory, base);
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);
    await pipeline(readableStream, writableStream);
    await unlink(pathToFile);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
