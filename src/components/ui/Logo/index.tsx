import { Link } from "#ui/Link";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";
import classNames from "classnames";

export const Logo: React.FC = ({ className, ...headingProps }: HTMLElementAttributes <HTMLHeadingElement>): JSX.Element => (
	<h1 className={classNames("logo", className)} {...headingProps}>
		<Link className="logo__link" href="/">Electronly</Link>
	</h1>
);