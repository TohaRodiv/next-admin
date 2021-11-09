import Router from 'next/router'
import { Button } from '../../ui/Button';

type TProps = {
	value?: string
}

export const BackButton: React.FC<TProps> = ({ value }): JSX.Element => (
	<Button onClick={() => Router.back()}>{ value ? value : "Назад"}</Button>
);