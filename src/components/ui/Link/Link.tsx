import LinkNext, { LinkProps, } from "next/link";
import { HTMLElementAttributes } from "#types/HTMLElementAttributes";

type TProps = LinkProps & HTMLElementAttributes <HTMLAnchorElement>

export const Link: React.FC <TProps> = ({
	children,
	href,
	as,
	replace,
	scroll,
	shallow,
	passHref,
	prefetch,
	locale,
	...linkProps
}: TProps): JSX.Element => {
	
	return (
		<LinkNext {...{href, as, replace, scroll, shallow, passHref, prefetch, locale}}>
			<a { ...linkProps }>
				{ children }
			</a>
		</LinkNext>
	);
};