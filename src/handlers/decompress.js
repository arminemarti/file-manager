import { createReadStream, createWriteStream } from 'fs';
import { parse, resolve } from 'path';
import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import displayCurrentDirectory from '../helpers/displayCurrentDirectory.js';
import isDirectory from '../helpers/isDirectory.js';
import isFile from '../helpers/isFile.js';

export default async function handleDecompress([
  pathToFile,
  pathToDestination,
]) {
  try {
    const isNotDirectory = !(await isDirectory(pathToDestination));
    const isNotFile = !(await isFile(pathToFile));

    if (isNotDirectory) throw new Error("It's not a directory.");
    if (isNotFile) throw new Error("It's not a file.");

    pathToFile = resolve(pathToFile);
    const { name, ext } = parse(pathToFile);

    if (!ext.includes('.br')) throw new Error('Invalid file extension.');

    pathToDestination = resolve(pathToDestination, name);

    const readableStream = createReadStream(pathToFile);
    const writableStream = createWriteStream(pathToDestination);
    const brotliDecompress = createBrotliDecompress();
    await pipeline(readableStream, brotliDecompress, writableStream);
    displayCurrentDirectory();
  } catch (error) {
    console.error('Operation failed.');
  }
}
