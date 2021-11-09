import { Container, } from "react-grid-system";
import classNames from "classnames";
import { HTMLElementAttributes } from "#data-transfer-types/src/types/HTMLElementAttributes";
import { TMenu } from "#data-transfer-types/src/types/TMenu";


type TPropsComponent = {
	menu: {
		main: TMenu
	}
} & HTMLElementAttributes<HTMLElement>

export const Header: React.FC<TPropsComponent> = ({ className, ...headerProps }: TPropsComponent): JSX.Element => (

	<header className={classNames("top-header", className)} {...headerProps}>
		<Container>
			<h3>Hello, Header!</h3>
		</Container>
	</header>

);