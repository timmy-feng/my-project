class PinRequester {
    async getPins(token) {
        const result = await fetch('/marker/listing?' + new URLSearchParams({token}));
        if (!result.ok) {
            console.log(result.statusText);
            return [];
        }
        return await result.json();
    }

    async deletePin(id, token) {
        const result = await fetch(`/marker/delete/${id}?` + new URLSearchParams({token}), { method: 'POST' });
        if (!result.ok) {
            console.log(result.statusText);
            return null;
        }
        return await result.json();
    }

    async createPin(pin, token) {
        const result = await fetch('/marker/create?' + new URLSearchParams({token}), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pin),
        });
        if (!result.ok) {
            console.log(result.statusText);
            return null;
        }
        return await result.json();
    }

    async updatePin(pin, id, token) {
        const result = await fetch(`/marker/update/${id}?` + new URLSearchParams({token}), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pin),
        });
        console.log(`Pin update status: ${result.ok}`);

        const updatedPin = await result.json();
        console.log(updatedPin);
        return updatedPin;
    }

    async getPin(id, token) {
        const result = await fetch(`/marker/get/${id}?` + new URLSearchParams({token}));
        if (!result.ok) {
            console.log(result.statusText);
            return null;
        }
        return await result.json();
    }

    async getPinsByTag(tag, token) {
        const result = await fetch(`/marker/tag/${tag}?` + new URLSearchParams({token}));
        return await result.json();
    }
}

export default new PinRequester();