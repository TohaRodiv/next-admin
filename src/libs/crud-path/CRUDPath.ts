export class CRUDPath {
    
	public static getPathFindAll(path: string) {
      return this.createPath({path, method: "view-all"});
    }
  
    public static getPathFindById(path: string, id: number) {
      return this.createPath({path, id, method: "view"});
    }
  
    public static getPathCreate(path: string) {
      return this.createPath({path, method: "create"});
    }
  
    public static getPathUpdate(path: string, id: number) {
      return this.createPath({path, id, method: "edit"});
    }

	private static createPath({path, method, id}: { path: string, method: "view" | "view-all" | "edit" | "create", id?: number}): string {
		let crudPath = null;

		if (method == "view-all") {
			crudPath = path;
		} else {
			crudPath = `${method}${id ? path.replace("{id}", `${id}`) : path}`;
		}

		return `http://localhost:3000/entity/${crudPath}`;
	}
  }