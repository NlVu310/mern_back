const UserService = require('../services/UserService')
const JWTService = require('../services/JwtService')


const createUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không được để trống'
            })
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Cần nhập email'
            })
        }
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Nhập lại mật khẩu sai'
            })
        }
        const respone = await UserService.createUser(req.body)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Không được để trống'
            })
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Cần nhập email'
            })
        }
        const respone = await UserService.loginUser(req.body)
        const { refresh_token, ...newRespone } = respone
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,  // chi truy cap = http
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newRespone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu người dùng'
            })
        }
        const respone = await UserService.updateUser(userId, data)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu người dùng'
            })
        }
        const respone = await UserService.deleteUser(userId)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu người dùng'
            })
        }
        const respone = await UserService.deleteManyUser(ids)
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const respone = await UserService.getAllUser()
        return res.status(200).json(respone)

    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Yêu cầu người dùng'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        let token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JWTService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'đăng xuất thành công'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteMany
}