import { stat } from 'fs/promises';
import { resolve } from 'path';

export default async function isDirectory(path) {
  try {
    path = resolve(path);
    const stats = await stat(path);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}
