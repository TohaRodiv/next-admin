import classNames from "classnames";

type TProps = {
	justify?: "center" | "start" | "end" | "between" | "around"
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const ButtonGroup: React.FC <TProps> = ({ children, justify, className, }): JSX.Element => {
	const classes = classNames(
		"button-group",
		!!justify && `button-group--justify--${justify}`,
		className
	);
	return (
		<div className={classes}>
			{children}
		</div>
	);
};