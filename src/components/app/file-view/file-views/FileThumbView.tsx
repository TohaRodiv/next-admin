import classNames from "classnames";
import { useSettings } from "src/context";

type TProps = {
	path: string
	mimeType: string
	className?: string
}

export const FileThumbView: React.FC<TProps> = ({ path, mimeType, className, }): JSX.Element=> {
	let thumbView = null;
	const classes = classNames(className);
	const { API_URL } = useSettings();

	switch (mimeType) {
		default:
			thumbView = <img src={`${API_URL}/${path}`} alt="" />
	}

	return (
		<div className={classes}>
			{thumbView}
		</div>
	);
}