export const imageAssets = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,svg,ico}', { as: 'url', eager: true });

export const getImage = (path: string) => {
  // normalize path to remove leading slash if any
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  return imageAssets[`/src/assets/images${normalizedPath}`] || imageAssets[`/src/assets${normalizedPath}`] || path;
};
