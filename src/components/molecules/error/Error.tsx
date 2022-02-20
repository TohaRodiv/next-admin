import { FC } from "react"
import styles from "./style.module.scss";

type TProps = {
	statusCode: number | undefined
	title: string
}

const Error: FC<TProps> = ({
	statusCode,
	title,
}) => {
	return (
		<div className={styles["error__wrapper"]}>
			{
				statusCode ? (
					<>
						<div className={styles["error"]} title={`${statusCode}`}>{statusCode}</div>
						<div className={styles["error__description"]}>
							{title}
						</div>
					</>
				) : "Ошибка на клиенте"
			}
		</div>
	);
}

export {
	Error
};