import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const loginSchema = yup.object().shape({
    email: yup.string().
        required("Email không được để trống").
        email("Email không hợp lệ"),
    password: yup.string().
        required("Mật khẩu không được để trống").
        min(6, "Mật khẩu phải có ít nhất 6 ký tự").
        max(50, "Mật khẩu chỉ được nhiều nhất 50 ký tự"),
})

export const registerSchema = yup.object().shape({
    name: yup.string().
        required("Tên không được để trống ").
        min(4, "Tên tối thiểu 4 kí tự").
        max(50, "Tên nhiều nhất chỉ được 50 kí tự"),
    email: yup.string().
        required("Email không được để trống").
        email("Email không hợp lệ").
        max(50, "Mail nhiều nhất chỉ được 50 kí tự"),
    phone: yup.string().
        required("Số điện thoại không được để trống").
        matches(phoneRegExp, "Số điện thoại phải nhập số").
        min(7, "Số điện thoại có ít nhất 7 số").
        max(15, "Số điện thoại nhiều nhất 15 số"),
    password: yup.string().
        required("Mật khẩu không được để trống").
        min(6, "Mật khẩu phải có ít nhất 6 ký tự").
        max(50, "Mật khẩu nhiều nhất 50 ký tự"),
    confirmPassword: yup.string().
        required("Mật khẩu xác nhận không được để trống").
        oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận phải khớp"),
})

export const changePasswordSchema = yup.object().shape({
    password: yup.string().
        required("Mật khẩu không được để trống").
        min(6, "Mật khẩu phải có ít nhất 6 ký tự").
        max(50, "Mật khẩu nhiều nhất chỉ được 50 ký tự"),
    confirmPassword: yup.string().
        required("Mật khẩu xác nhận không được để trống").
        oneOf([yup.ref("password"), ""], "Mật khẩu xác nhận phải khớp"),
})

export const forgotPasswordSchema = yup.object().shape({
    email: yup.string().
        required("Email không được để trống").
        email("Email không hợp lệ"),
})

export const settingProfileSchema = yup.object().shape({
    userName: yup.string().
        required("Biệt danh không được để trống").
        min(4, "Tối thiểu 4 kí tự").
        max(50, "Nhiều nhất 50 kí tự"),
    fullName: yup.string().
        required("Tên không được để trống").
        min(4, "Tối thiểu 4 kí tự").
        max(50, "Nhiều nhất 50 kí tự"),
    phoneNumber: yup.string().
        required("Số điện thoại không được để trống").
        matches(phoneRegExp, "Số điện thoại phải nhập số").
        min(7, "Số điện thoại có ít nhất 7 số").
        max(15, "Số điện thoại nhiều nhất 15 số"),
    playingArea: yup.string().
        required("Địa chỉ không được để trống ").
        min(10, "Tối thiểu 10 kí tự").
        max(100, "Nhiều nhất 100 kí tự"),
    sortProfile: yup.string().
        required("Mô tả không được để trống ").
        min(10, "Tối thiểu 10 kí tự").
        max(500, "Nhiều nhất 500 kí tự"),
    imgURL: yup.lazy((value) =>
        /^data/.test(value)
            ? yup.string()
                .trim()
                .required("Hình ảnh không được để trống")
                .matches(
                    /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&",()*+;=\-._~:@/?%\s]*)$/i,
                    "Không phải là URL",
                )
            : yup.string().trim().
                required("Hình ảnh không được để trống").
                url("Không phải là URL"),
    ),
}).required()

export const commentSchema = yup.object().shape({
    comment: yup.string().
        required("Không được để trống").
        min(10, "Tối thiểu 10 kí tự").
        max(500, "Nhiều nhất 500 kí tự"),
})

export const walletRechargeSchema = yup.object().shape({
    money: yup.number().
        required("Không được để trống").
        min(10000, "Tối thiểu là 10,000 VNĐ").
        max(100000000, "Tối đa là 100,000,000 VNĐ"),
})

export const walletSchema = yup.object().shape({
    bankNumber: yup.string().required("Không được để trống").min(10, "Tối thiểu 10 ký tự").max(20, "Nhiều nhất 20 ký tự"),
    accountName: yup.string().required("Không được để trống"),
    money: yup.number().
        required("Không được để trống").
        min(10000, "Tối thiểu là 10,000 VNĐ").
        max(100000000, "Tối đa là 100,000,000 VNĐ"),
})

export const settingPasswordSchema = yup.object().shape({
    oldPass: yup.string().
        required("Mật khẩu cũ không được để trống").
        min(6, "Mật khẩu phải có ít nhất 6 ký tự").
        max(50, "Mật khẩu nhiều nhất chỉ được 50 ký tự"),
    newPass: yup.string().
        required("Mật khẩu mới không được để trống").
        min(6, "Mật khẩu phải có ít nhất 6 ký tự").
        max(50, "Mật khẩu nhiều nhất chỉ được 50 ký tự"),
    reEnterPass: yup.string().
        required("Mật khẩu xác nhận không được để trống").
        oneOf([yup.ref("newPass"), ""], "Mật khẩu xác nhận phải khớp"),
})

export const sendMessageSchema = yup.object().shape({
    message: yup.string().required()
})

export const sendNoticeSchema = yup.object().shape({
    value: yup.string().required("Không được để trống")
})

export const createBlogSchema = yup.object().shape({
    title: yup.string().
        required("Tiêu đề không được để trống").
        min(4, "Tối thiểu 4 kí tự").
        max(100, "Nhiều nhất 100 kí tự"),
    summary: yup.string().
        required("Đoạn trích không được để trống").
        min(50, "Tối thiểu 50 kí tự").
        max(500, "Nhiều nhất 500 kí tự"),
}).required()
