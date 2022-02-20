import { Header } from "./Header";
import { Body } from "./Body";
import { Section as _Section, TSectionProps } from "./Section";
import { FC } from "react";

type TProps = TSectionProps

type TComponents = {
	Body: typeof Body
	Header: typeof Header
}

const Section: FC<TProps> & TComponents = ({
	...propps
}) => {
	return <_Section {...propps} />
};

Section.Body = Body;
Section.Header = Header;

export { Section };