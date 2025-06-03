import '@testing-library/jest-dom';

// Polyfill TextEncoder & TextDecoder jika belum ada (Jest environment / Node)
import { TextEncoder, TextDecoder } from 'util';

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
});
