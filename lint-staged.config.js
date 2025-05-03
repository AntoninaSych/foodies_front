export default {
  'src/**/*.{js,jsx}': stagedFiles => [
    `eslint .`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
};
