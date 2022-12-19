import { stat } from 'fs/promises';
import { resolve } from 'path';

export default async function isFile(path) {
  try {
    path = resolve(path);
    const stats = await stat(path);
    return stats.isFile();
  } catch (error) {
    return false;
  }
}
