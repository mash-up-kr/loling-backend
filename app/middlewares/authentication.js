function authenticationMiddleware(req, res, next) {
    const userId = req.get('Authorization');

    if (userId) {
        // Header 중에 'Authorization' 값이 존재하면 해당 값을 UserId로 사용합니다.
        // 이 Middleware를 거치면 request에 'userId' 필드에 해당 값이 저장되어 사용이 가능합니다.
        req.userId = userId;
        next();
    } else {
        res.status(401);
        res.send({ message: 'Unauthorized' });
    }
}


module.exports = { authenticationMiddleware };
