// Expressive Code (Shiki) options. Kept in its own file so the <Code> component
// can read them too. Frames give filename tabs and terminal chrome; the copy
// button is built in.
import { definePlugin } from 'astro-expressive-code';
import { h } from 'astro-expressive-code/hast';

// Program output: src/lib/remark-output.mjs adds the bare word `output` to the
// meta of an untitled text block that follows a code block. Here that becomes a
// frameless, wrapping block with an "Output" label (styled in global.css), so
// it reads as a result and not as a second file. Titled text blocks keep the
// file-tab frame.
const outputBlocks = () =>
  definePlugin({
    name: 'output-blocks',
    hooks: {
      preprocessMetadata: ({ codeBlock }) => {
        if (!codeBlock.metaOptions.getBoolean('output')) return;
        codeBlock.props.frame = 'none';
        codeBlock.props.wrap = true;
        codeBlock.props.preserveIndent = true;
      },
      postprocessRenderedBlock: ({ codeBlock, renderData }) => {
        if (!codeBlock.metaOptions.getBoolean('output')) return;
        const root = renderData.blockAst;
        root.properties = { ...root.properties, className: [...(root.properties?.className ?? []), 'ec-output'] };
        root.children.unshift(h('span.ec-output-label', 'Output'));
      },
    },
  });

export default {
  plugins: [outputBlocks()],
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
