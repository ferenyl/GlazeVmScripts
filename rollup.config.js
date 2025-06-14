import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/focusWorkspaceOnMonitor.ts',
    output: {
      dir: 'dist/',
      format: 'es'
    },
    plugins: [resolve(), commonjs(), typescript()]
  },
  {
    input: 'src/moveToWorkspaceOnMonitor.ts',
    output: {
      dir: 'dist/',
      format: 'es'
    },
    plugins: [resolve(), commonjs(), typescript()]
  },
  {
    input: 'src/moveAllToWorkspace.ts',
    output: {
      dir: 'dist/',
      format: 'es'
    },
    plugins: [resolve(), commonjs(), typescript()]
  }
];