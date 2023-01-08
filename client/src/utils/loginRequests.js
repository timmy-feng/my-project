export async function loginUser(credentials) {
    const result = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return await result.json();
}

export async function registerUser(credentials) {
    const result = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).catch((err) => {
        console.log(err);
        return null;
    });
    return await result.json();
}

export async function getUsername(token) {
    const result = await fetch('http://localhost:3000/user/username?' + new URLSearchParams({token}));
    return await result.json();
}