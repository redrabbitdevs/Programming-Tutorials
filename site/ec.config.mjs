// Expressive Code (Shiki) options. Kept in its own file so the <Code> component
// can read them too. Frames give filename tabs and terminal chrome; the copy
// button is built in.
export default {
  themes: ['github-dark', 'github-light'],
  themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
  useDarkModeMediaQuery: true,
  defaultProps: { wrap: false, showLineNumbers: false },
  styleOverrides: {
    // Pairs are [dark, light].
    codeBackground: ['#0f1624', '#f0f3f8'],
    borderColor: ['#243049', '#d3dae6'],
    borderRadius: '6px',
    codeFontFamily: "'Commit Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
    codeFontSize: '0.875rem',
    codeLineHeight: '1.65',
    uiFontFamily: "'Instrument Sans Variable', system-ui, sans-serif",
    uiFontSize: '0.8125rem',
    codePaddingInline: '1.1rem',
    frames: {
      frameBoxShadowCssValue: 'none',
      editorTabBarBackground: ['#0a0f19', '#e4e9f2'],
      editorActiveTabBackground: ['#0f1624', '#f0f3f8'],
      editorActiveTabIndicatorTopColor: ['#86a5ff', '#1f4fd8'],
      editorActiveTabIndicatorHeight: '2px',
      terminalTitlebarBackground: ['#0a0f19', '#e4e9f2'],
      terminalBackground: ['#0f1624', '#f0f3f8'],
    },
  },
};
