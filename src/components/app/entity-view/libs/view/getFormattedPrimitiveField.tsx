export function getFormattedField(type: string, value: any) {
	switch (type) {
		case "number":
		case "password":
		case "email":
		case "text":
			return value.toString();
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