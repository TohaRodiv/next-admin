const API_URL = "http://todo.dv:8081";
const LOCAL_API_URL = "http://localhost:3000";

export const appConfig = {
	API_URL,
	LOCAL_API_URL,
	LOCAL_API_ENTITIES_URL: `${LOCAL_API_URL}/api/entities`,
	LOCAL_API_UPLOAD_URL: `${LOCAL_API_URL}/api/upload`,
};