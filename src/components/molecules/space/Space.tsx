import { FC } from "react";
import { Space as AntdSpace, SpaceProps } from "antd";

type TProps = SpaceProps & {
	display?: "flex" | "inline-flex"
	justifyContent?: "start" | "end" | "center" | "space-between" | "space-around" | "space-evenly"
}

const Space: FC<TProps> = ({
	display,
	justifyContent,
	children,
	...props
}) => {
	return (
		<AntdSpace
			style={{
				display,
				justifyContent,
			}}
			{...props}>
			{children}
		</AntdSpace>
	);
};

export { Space };