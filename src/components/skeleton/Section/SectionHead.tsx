import classNames from "classnames";
import { PropsWithChildren } from "react";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";

type THeadVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

type TProps = PropsWithChildren <{
	className?: string
	variant?: THeadVariants
}> & HTMLElementAttributes <HTMLHeadingElement>

export const SectionHead: React.FC<TProps> = ({ children, className, variant, ...headingProps }: TProps): JSX.Element => {

	const HeadVariant: THeadVariants = variant || "h2";
	const classes = classNames ("section__head", className);

	return (
		<HeadVariant className={classes} {...headingProps}>
			{children}
		</HeadVariant>
	);
};