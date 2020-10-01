const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST', // Каким образом отправляем?
        headers: {
            'Content-type': 'application/json'
        },
        body: data // Что именно отправляем?
    });

    return await result.json();
};

const getResourse = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};

export {
    postData,
    getResourse
};