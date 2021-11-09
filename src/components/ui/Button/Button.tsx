import React from "react";
import classNames from "classnames";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";

type TProps = {
	variant?: "default" | "primary" | "secondary" | "action" | "success" | "warning" | "error"
} & HTMLElementAttributes<HTMLButtonElement>

export const Button: React.FC<TProps> = ({ children, variant, className, ...buttonProps }: TProps): JSX.Element => {
	const classes = classNames(
		"btn",
		className,
		variant ? `btn--${variant}` : null
	);

	return (
		<button
			className={classes}
			{...buttonProps}>
			{children}
		</button>
	);
};