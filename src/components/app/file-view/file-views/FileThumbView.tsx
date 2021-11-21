import classNames from "classnames";

type TProps = {
	path: string
	mimeType: string
	className?: string
}

export const FileThumbView: React.FC<TProps> = ({ path, mimeType, className, }): JSX.Element=> {
	let thumbView = null;
	const classes = classNames(className);

	switch (mimeType) {
		default:
			thumbView = <img src={`http://todo.dv:8081/${path}`} alt="" />
	}

	return (
		<div className={classes}>
			{thumbView}
		</div>
	);
}