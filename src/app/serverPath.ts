import path from 'path';
import getConfig from 'next/config';

export const serverPath = (staticFilePath: string) => {
  console.log('serverPath', getConfig().serverRuntimeConfig.PROJECT_ROOT);
  return path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    staticFilePath
  );
};

import { join } from 'path';
export function getDbFilePath() {
  return join(process.cwd(), 'youtube.db'); // adjust the path accordingly
}
