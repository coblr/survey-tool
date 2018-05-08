export const URLMock = (() => {
  return {
    createObjectURL: () => {
      return 'url/to/object';
    }
  };
})();
global.URL = URLMock;
