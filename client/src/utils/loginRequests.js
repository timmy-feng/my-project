export async function loginUser(credentials) {
    const result = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    console.log('hey');
    return await result.json();
}

export async function registerUser(credentials) {
    const result = await fetch('/user/register', {
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
    const result = await fetch('/user/username?' + new URLSearchParams({token}));
    return await result.json();
}