module.exports = {
  printWidth: 100,
  parser: 'typescript',
  singleQuote: true,
  useTabs: false,
  trailingComma: 'es5',
  overrides: [
    {
      files: '*.{css,scss,less}',
      options: {
        parser: 'postcss',
      },
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown',
      },
    },
    {
      files: '*.{gql,graphql,graphql.ts}',
      options: {
        parser: 'graphql',
      },
    },
    {
      files: '*.{js,jsx}',
      options: {
        parser: 'flow',
      },
    },
    {
      files: '*.{ts,tsx}',
      options: {
        parser: 'typescript',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
  ],
};
