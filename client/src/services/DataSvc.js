const PORTFOLIO_URL = 'http://localhost:8080/api/stocks/user';
const ALL_STOCKS_URL = 'http://localhost:8080/api/stocks/all';
const ACTION_URL = 'http://localhost:8080/api/stocks/action';
const ENTRY_URL = 'http://localhost:8080/api/stocks/entry';


// GET /api/stocks/user
export async function getPortfolioData(accessToken) {
    const resp = await fetch(PORTFOLIO_URL, {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return resp.json();
}

// GET /api/stocks/all
export async function getAllStocksData(accessToken) {
    const resp = await fetch(ALL_STOCKS_URL, {
        method: 'GET',
        mode: 'cors',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return resp.json();
}

// POST /api/stocks/action
export async function postAction(accessToken, data) {
    const resp = await fetch(ACTION_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return resp.json();
}

// POST /api/stocks/entry
export async function postEntry(accessToken, data) {
    const resp = await fetch(ENTRY_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+accessToken
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return resp.json();
}