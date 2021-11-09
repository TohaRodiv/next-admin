import Document, {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

export default class CustomDocument extends Document {
	
	public render(): JSX.Element {

		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}