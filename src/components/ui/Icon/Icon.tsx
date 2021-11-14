import classNames from "classnames";
import styles from "#styles/modules/fontawesome.module.scss";


type TIconProps = {
	type?: "fa" | "fab" | "far"
	name: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

export const Icon: React.FC <TIconProps> = ({ name, type = "fa", className, ...spanProps }: TIconProps): JSX.Element => {

	const iconName = `fa-${name}`;
	const classes = classNames (styles[type], styles[iconName], className);
	return (
		<span className={ classes } {...spanProps}></span>
	);
};