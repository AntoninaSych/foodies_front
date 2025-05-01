export default {
  '**/*.{js,jsx}': stagedFiles => [
    `eslint .`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
};
