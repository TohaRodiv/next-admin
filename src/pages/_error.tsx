import {NextPageContext} from "next";

function Error ({ statusCode }: {statusCode: number}): JSX.Element {
	return (
		<p>
			{statusCode ? 
				`Ошибка ${statusCode} на сервере`:
				"Произошла ошибка на клиенте"
			}
		</p>
	);
}
	
Error.getInitialProps = ({ res, err }: NextPageContext) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};
  
export default Error;