import { Empty as EmptyAntd, EmptyProps } from "antd";
import { FC } from "react";

type TProps = EmptyProps

const Empty: FC<TProps> = ({
	...props
}) => {
	return <EmptyAntd {...props} />;
};

export {
	Empty
};