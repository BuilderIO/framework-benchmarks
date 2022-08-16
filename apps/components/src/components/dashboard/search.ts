import Fuse from 'fuse.js';
import { frameworks } from './frameworks';

export const fuse = new Fuse(frameworks, {
  keys: ['title', 'author.firstName'],
});
