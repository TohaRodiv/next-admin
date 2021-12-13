export const excludeEntityPaths: {
	[path: string]: (path: string) => string | null
} = {
	"/files": (path: string) => null,
};