import React, { useContext } from "react";
import { appConfig } from "#config/app-config";

const settings = {
	API_URL: appConfig.API_URL,
};

export const SettingsContext = React.createContext(settings);

export const SettingProvider: React.FC = ({ children, }): JSX.Element => {
	return (
		<SettingsContext.Provider value={settings}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => useContext(SettingsContext);