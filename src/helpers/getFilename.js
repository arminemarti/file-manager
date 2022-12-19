import { fileURLToPath } from 'url';

export default function getFilename(importMetaUrl) {
  return fileURLToPath(importMetaUrl);
}
