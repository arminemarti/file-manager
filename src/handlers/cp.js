import { createReadStream, createWriteStream } from 'fs';
import { parse, resolve } from 'path';
import { pipeline } from 'stream/promises';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';

export default async function handleCp([pathToFile, pathToNewDirectory]) {
  try {
    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    pathToNewDirectory = resolve(pathToNewDirectory, base);
    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToNewDirectory);
    await pipeline(readableStream, writableStream);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
