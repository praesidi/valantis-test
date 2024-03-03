import md5 from 'md5';

export default function generateAuthToken(password: string) {
	const timestamp = getTimestamp();
	// console.log('token generated');

	return md5(`${password}_${timestamp}`);
}

// returns current timestamp in yyyymmdd format
function getTimestamp() {
	const date = new Date();

	const year = date.getFullYear();
	const month =
		date.getMonth() > 8 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
	const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;

	const result = `${year}${month}${day}`;

	return result;
}
