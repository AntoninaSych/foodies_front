export default {
  '**/*.{js,jsx}': stagedFiles => {
    console.log(stagedFiles);

    return [`eslint .`, `prettier --write ${stagedFiles.join(' ')}`];
  },
};
