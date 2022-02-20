export class CRUDPath {
    public static getPathFindAll(path: string) {
      return this.createPath(path, "view");
    }
  
    public static getPathFindById(path: string, id: number) {
      return this.createPath(path, "view", id);
    }
  
    public static getPathCreate(path: string) {
      return this.createPath(path, "create");
    }
  
    public static getPathUpdate(path: string, id: number) {
      return this.createPath(path, "edit", id);
    }
  
    /**
     * TODO: http://localhost:3000 - заменить!
     * @param path 
     * @param method 
     * @param id 
     * @returns 
     */
    private static createPath(path: string, method: "view" | "edit" | "create", id?: number) {
      return `http://localhost:3000/entity/${method}${id ? path.replace("{id}", `${id}`) : path}`;
    }
  }