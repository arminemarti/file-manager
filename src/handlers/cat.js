import { createReadStream } from 'fs';
import { resolve } from 'path';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';
import { pipeline } from 'stream/promises';
import { customOutput } from '../helpers/other.js';

export default async function handleCat([pathToFile]) {
  try {
    pathToFile = resolve(pathToFile);
    const readableStream = createReadStream(pathToFile, { encoding: 'utf8' });
    await pipeline(readableStream, customOutput());
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
