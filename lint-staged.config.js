export default {
  '**/*.{js}': stagedFiles => [
    `eslint .`,
    `prettier --write ${stagedFiles.join(' ')}`,
  ],
};
