function getControlerPathFromArray(path: string[]): string {
	return `/${path.join("/")}`;
}