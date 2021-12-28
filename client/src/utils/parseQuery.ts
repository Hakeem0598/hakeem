const parseQueryString = (queryString: string) => {
    const queryObject: {[key: string]: string} = {};

    const queries = queryString.split('?')[1].split('&');

    for (const query of queries) {
        const [key, value] = query.split('=');
        queryObject[key] = value;
    }

    return queryObject;
}

export default parseQueryString;