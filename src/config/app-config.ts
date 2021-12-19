const API_URL = "http://ec2-3-129-62-219.us-east-2.compute.amazonaws.com";
const LOCAL_API_URL = "http://localhost:3000";

export const appConfig = {
	API_URL,
	LOCAL_API_URL,
	LOCAL_API_ENTITIES_URL: `${LOCAL_API_URL}/api/entities`,
	LOCAL_API_UPLOAD_URL: `${LOCAL_API_URL}/api/upload`,
};