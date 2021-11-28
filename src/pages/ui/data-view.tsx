import { NextPage } from "next";
import { Container } from "react-grid-system";
import { DataView } from "#components/app/data-view";

const DataViewPage: NextPage = (): JSX.Element => {

	return (
		<Container>
			<DataView />
		</Container>
	);
};

export default DataViewPage;