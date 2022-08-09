import { $ } from 'zx';
import { getPort } from './get-port.js';

/**
 * Kill process by port
 */
export async function killProcess(port: number) {
  return $`lsof -t -i tcp:${port} | xargs kill`.catch(() => null);
}

/**
 * Loop over all frameworks, find their port, and kill their
 * servers if running
 */
export async function killAll(frameworks: string[]) {
  const ports = new Set(await Promise.all(frameworks.map(getPort)));
  return Promise.all(Array.from(ports).map(killProcess));
}
