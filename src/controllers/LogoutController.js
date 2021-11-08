module.exports = {   
    async store(request, response) {
        blackList.push(request.headers['x-access-token']);
        response.end();
    }
}