export default async function sendRequest(url, method = 'GET', payload) {
	const token = localStorage.getItem('token');

	const headers = {
		'Content-Type': 'application/json',
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	const options = {
		method,
		headers,
	};

	if (payload) {
		options.body = JSON.stringify(payload);
	}

	try {
		const res = await fetch(`http://127.0.0.1:8000${url}`, options);
		console.log("res in sendrequest", res);
		if (res.ok) return res.json();
		const errorData = await res.json();
		console.error("Error response:", errorData);
		return errorData;
	} catch (err) {
		console.log(err, "error in send-request");
		return err;
	}
}
