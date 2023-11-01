const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String },
    },
    {
        timestamps: true, //cap nhat 
    }
);

const User = mongoose.model("User", UserSchema); //tạo một bảng là Users ( tự thêm S vào cuối ) trong mongoDb , 
module.exports = User; //cho phép sử dụng ở nơi khác