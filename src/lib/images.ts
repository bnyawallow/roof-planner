export const imageAssets = import.meta.glob("/src/assets/images/**/*.{png,jpg,jpeg,svg,ico}", { query: "?url", import: "default", eager: true });

export const getImage = (path: string) => {
  const normalizedPath = path.startsWith("/") ? path : "/" + path;
  return (imageAssets[`/src/assets/images${normalizedPath}`] || imageAssets[`/src/assets${normalizedPath}`] || path) as string;
};
