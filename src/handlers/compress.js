import { createReadStream, createWriteStream } from 'fs';
import { parse, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';
import isDirectory from '../helpers/isDirectory.js';
import isFile from '../helpers/isFile.js';

export default async function handleCompress([pathToFile, pathToDestination]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination));
    const isNotFile = !(await isFile(pathToFile));

    if (isNotDirectory) throw new Error("It's not a directory.");
    if (isNotFile) throw new Error("It's not a file.");

    pathToFile = resolve(pathToFile);
    const { base } = parse(pathToFile);
    const fileName = `${base}.br`;
    pathToDestination = resolve(pathToDestination, fileName);

    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToDestination);
    const brotliCompress = createBrotliCompress();
    await pipeline(readableStream, brotliCompress, writableStream);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
