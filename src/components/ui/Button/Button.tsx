import React from "react";
import classNames from "classnames";
import { Icon } from "../Icon";

export type TButtonProps = {
	variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link"
	iconName?: string
	iconType?: "fa" | "fab" | "far"
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: React.FC<TButtonProps> = ({
	children,
	variant,
	className,
	iconName,
	iconType,
	...buttonProps
}): JSX.Element => {
	const classes = classNames(
		"btn",
		className,
		variant ? `btn--${variant}` : null
	);

	return (
		<button
			className={classes}
			{...buttonProps}>
			{
				!!iconName && (
					<span className="btn__icon">
						<Icon type={iconType || "fa"} name={iconName} />
					</span>
				)
			}

			{
				children && (
					<span className="btn__text">
						{children}
					</span>
				)
			}
		</button>
	);
};