const SIGNIN_URL = 'http://localhost:8080/api/auth/signin';
// const ADMIN_HOME_URL = 'http://localhost:8080/api/test/admin';

// Signin + go to home
export async function loginSubmit(username, password) {
    const data = {
        username,
        password
    }
    return postSigninRequest(data);
}

// POST request URL - /api/auth/signin
async function postSigninRequest(data) {
    const resp = await fetch(SIGNIN_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return resp.json();
}