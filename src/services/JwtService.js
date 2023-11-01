const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

const genneralAccessToken = (payload) => { //khi login thì chỉ truyền vào admin và id (trong userservice)
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '90d' })

    return access_token
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "ERROR",
                        message: "The token is require"
                    })
                }
                const access_token = await genneralAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                resolve({
                    status: "OK",
                    message: "Success",
                    access_token
                })
            })
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}