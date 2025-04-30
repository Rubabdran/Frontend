import sendRequest from "./sendRequest";
const url = "/users/"

export async function signup(formData) {
    try {
        const response = await sendRequest(`${url}/signup/`, "POST", formData)
        localStorage.setItem('token', response.access);
        return response.user
    } catch(err) {
        localStorage.removeItem('token');
        return null;
    }
}

export async function login(formData) {
    try {
        const response = await sendRequest(`${url}/login/`, "POST", formData)
        localStorage.setItem('token', response.access);
        console.log(response, "login check response")
        return response.user
    } catch (err) {
        localStorage.removeItem('token');
        return null;
    }
}


export async function logout() {
    localStorage.removeItem('token');
}