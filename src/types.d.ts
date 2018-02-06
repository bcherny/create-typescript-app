declare module 'copy-template-dir' {
  type Callback = (error: Error | null, files: string[] | null) => any
  function copy<Vars extends object>(
    inputDir: string,
    outputDir: string,
    vars: Vars,
    cb: Callback
  ): void
  export = copy
}
