import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream/promises';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';
import { customOutput } from '../helpers/other.js';

export default async function handleHash([pathToFile]) {
  try {
    pathToFile = resolve(pathToFile);
    const hash = createHash('sha256');
    const readableStream = createReadStream(pathToFile);
    await pipeline(readableStream, hash.setEncoding('hex'), customOutput());
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
