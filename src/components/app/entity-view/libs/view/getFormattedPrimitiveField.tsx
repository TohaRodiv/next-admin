import TextTruncate from 'react-text-truncate';

export function getFormattedField(type: string, value: any) {
	if (value === null) {
		return "NULL";
	}
	switch (type) {
		case "number":
		case "password":
		case "email":
		case "text":
			if (value) {
				return value.toString();
			} else {
				return value;
			}
	
		case "textarea":
		case "url":
			if (value) {
				return <TextTruncate line={1} element="span" truncateText="..." text={value.toString()} />;
			} else {
				return value;
			}

		case "date":
			return new Date(value).toLocaleString("ru", {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				weekday: 'long',
				timeZone: 'UTC',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			});
		case "checkbox":
			return (
				<input type="checkbox" defaultChecked={!!value} disabled={true} />
			);

		default:
			return value.toString();
	}
}