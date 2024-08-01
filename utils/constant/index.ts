import { Option } from "@/types";
import { AiFillMail } from "react-icons/ai";
import { BiSolidBellRing, BiSolidLockAlt, BiSolidPhoneCall, BiSolidUser } from "react-icons/bi";
import { BsFileEarmarkPost, BsFillFileEarmarkPostFill, BsFillFileEarmarkRuledFill } from "react-icons/bs";
import { FaHome, FaPollH, FaUserEdit, FaUserFriends, FaUserSlash } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";

export const navLinks = [
    {
        id: "1",
        label: "Danh sách sân",
        href: "/product/list-product"
    },
    {
        id: "4",
        label: "Quản lý đơn đặt",
        href: "/transaction/list-transaction"
    },
    {
        id: "5",
        label: "Ví tiền",
        href: "/user/wallet"
    },
]

export const navLinksAdmin = [
    {
        id: "1",
        label: "Quản lý chung",
        href: "/admin/admin-home"
    },
    {
        id: "2",
        label: "Xem thêm",
        linkItems: [
            {
                id: "1",
                label: "Danh sách sân",
                href: "/product/list-product"
            },
            // {
            //     id: "2",
            //     label: "Nhắn tin",
            //     href: "/user/chat-room"
            // },
            {
                id: "3",
                label: "Quản lý người dùng",
                href: "/admin/user-management"
            },
            {
                id: "4",
                label: "Quản lý bài viết",
                href: "/admin/post-management"
            },
            // {
            //     id: "5",
            //     label: "Quản lý báo cáo",
            //     href: "/admin/user-report-management"
            // },
            {
                id: "6",
                label: "Quản lý doanh thu",
                href: "/product/report-management"
            },
        ]
    }
]

export const navLinksStaff = [
    {
        id: "1",
        label: "Quản lý bài viết",
        href: "/admin/post-management"
    },
    {
        id: "2",
        label: "Xem thêm",
        linkItems: [
            // {
            //     id: "2",
            //     label: "Quản lý báo cáo",
            //     href: "/admin/user-report-management"
            // },
            {
                id: "3",
                label: "Đăng bài",
                href: "/product/post-product"
            },
            {
                id: "4",
                label: "Quản lý bài đăng",
                href: "/product/management-product"
            },
        ]
    }
]

export const loginInputs = [
    {
        id: "email",
        icon: AiFillMail,
        label: "Email",
        placeholder: "Nhập email của bạn",
        type: "email",
        name: "email"
    },
    {
        id: "password",
        icon: BiSolidLockAlt,
        label: "Mật khẩu",
        placeholder: "Nhập mật khẩu của bạn",
        type: "password",
        name: "password"
    }
];

export const registerInputs = [
    {
        id: "name",
        icon: BiSolidUser,
        label: "Họ và tên",
        placeholder: "Nhập họ và tên",
        type: "text",
        name: "name"
    },
    {
        id: "email",
        icon: AiFillMail,
        label: "Email",
        placeholder: "Nhập email của bạn",
        type: "email",
        name: "email"
    },
    {
        id: "phone",
        icon: BiSolidPhoneCall,
        label: "Số điện thoại",
        placeholder: "Nhập số điện thoại",
        type: "number",
        name: "phone",
        maxLength: 15
    },
    {
        id: "password",
        icon: BiSolidLockAlt,
        label: "Mật khẩu",
        placeholder: "Nhập mật khẩu của bạn",
        type: "password",
        name: "password"
    },
    {
        id: "confirmPassword",
        icon: BiSolidLockAlt,
        label: "Xác nhận mật khẩu",
        placeholder: "Nhập lại mật khẩu của bạn",
        type: "password",
        name: "confirmPassword"
    }
];

export const changePasswordInputs = [
    {
        id: "password",
        icon: BiSolidLockAlt,
        label: "Mật khẩu",
        placeholder: "Nhập mật khẩu của bạn",
        type: "password",
        name: "password"
    },
    {
        id: "confirmPassword",
        icon: BiSolidLockAlt,
        label: "Xác nhận mật khẩu",
        placeholder: "Nhập lại mật khẩu của bạn",
        type: "password",
        name: "confirmPassword"
    }
];

export const settingProfileInputs = [
    {
        id: "userName",
        label: "Biệt danh:",
        type: "text",
        name: "userName"
    },
    {
        id: "fullName",
        label: "Họ và tên:",
        type: "text",
        name: "fullName"
    },
    {
        id: "phoneNumber",
        label: "Số điện thoại:",
        type: "number",
        name: "phoneNumber",
        maxLength: 15
    },
    {
        id: "playingArea",
        label: "Quận:",
        type: "text",
        name: "playingArea",
        maxLength: 100
    },
    {
        id: "sortProfile",
        label: "Mô tả:",
        type: "text",
        name: "sortProfile",
        flagInput: true,
        maxLength: 500
    },
]

export const settingOptions: Option[] = [
    { id: 1, label: "Hồ sơ", icon: FaUserEdit },
    { id: 2, label: "Bảo mật", icon: IoShieldCheckmark },
    // { id: 3, label: "Chặn người dùng", icon: FaUserSlash },
    // { id: 3, label: "Thông báo", icon: BiSolidBellRing },
]

export const adminOptions: Option[] = [
    { id: 1, label: "Quản lý chung", icon: FaHome },
    { id: 2, label: "Quản lý người dùng", icon: FaUserFriends },
    { id: 3, label: "Quản lý tin tức", icon: BsFillFileEarmarkPostFill },
    { id: 4, label: "Quản lý doanh thu", icon: BsFillFileEarmarkRuledFill },
    { id: 5, label: "Chính sách", icon: FaPollH },
    // { id: 6, label: "Quản lý báo cáo", icon: BsFileEarmarkPost },
    { id: 7, label: "Đăng sân", icon: BsFileEarmarkPost },
    { id: 8, label: "Quản lí sân", icon: BsFileEarmarkPost },
]

export const beforeNavUser = [
    { label: "Đăng nhập", href: "/login" },
    { label: "Đăng ký", href: "/register" },
]

export const settingPasswordInputs = [
    {
        id: "oldPass",
        label: "Nhập mật khẩu hiện tại",
        type: "password",
        name: "oldPass"
    },
    {
        id: "newPass",
        label: "Nhập mật khẩu mới",
        type: "password",
        name: "newPass"
    },
    {
        id: "reEnterPass",
        label: "Nhập lại mật khẩu",
        type: "password",
        name: "reEnterPass"
    },
]

export const listVoucher = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export const listMethodsPayment = [
    {
        id: "1",
        src: "/images/VNPAY.png",
        title: "VNPAY",
        number: 789,
    },
    {
        id: "2",
        src: "/images/walletIcon.png",
        title: "Ví VBM",
        number: 789,
    },
]

export const listBlog = [
    {
        id: "1",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
    {
        id: "2",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
    {
        id: "3",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
    {
        id: "4",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
    {
        id: "5",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
    {
        id: "6",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
    {
        id: "7",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
    {
        id: "8",
        title: "The young Indian player's trip to the US encountered visa problems and many problems",
        date: "5/9/2023",
        description: "It was perhaps the most emotional meltdown on view at the recent TotalEnergies BWF World Championships 2023. Pearly Tan and Thinaah Muralitharan, with a historic women’s doubles medal for Malaysia within their grasp in the quarterfinals, eventually fell in three games, and the hurt was evident in their unrestrained tears.",
        src: "/images/item_1.jpg",
        poster: "Admin"
    },
]

export const customStyles = {
    control: (provided: any) => ({
        ...provided,
        border: 'none',
        paddingLeft: '1rem',
        marginLeft: '0px',
        backgroundColor: '#F5F5F5',
        paddingTop: '5px',
        paddingBottom: '5px',
        boxShadow: 'none !important',
        "*": {
            boxShadow: "none !important",
        },
        '&:hover': {
            border: 'none !important',
            boxShadow: 'none !important',
            outline: 'none !important',
        },
        '&:focus': {
            border: 'none !important',
            boxShadow: 'none !important',
            outline: 'none !important',
        },
    }),
}

export const locationCity = [
    {
        id: 1,
        name: "Thành Phố Hồ Chí Minh"
    },
    {
        id: 2,
        name: "Thành Phố Thủ Đức"
    }
]

export const locationDistrict_HCM = [
    {
        id: "1",
        name: "Quận 1",
    },
    {
        id: "2",
        name: "Quận 3",
    },
    {
        id: "3",
        name: "Quận 4",
    },
    {
        id: "4",
        name: "Quận 5",
    },
    {
        id: "5",
        name: "Quận 6",
    },
    {
        id: "6",
        name: "Quận 7",
    },
    {
        id: "7",
        name: "Quận 8",
    },
    {
        id: "8",
        name: "Quận 10",
    },
    {
        id: "9",
        name: "Quận 11",
    },
    {
        id: "10",
        name: "Quận 12",
    },
    {
        id: "11",
        name: "Quận Bình Thạnh",
    },
    {
        id: "12",
        name: "Quận Bình Tân",
    },
    {
        id: "13",
        name: "Quận Tân Bình",
    },
    {
        id: "14",
        name: "Quận Tân Phú",
    },
    {
        id: "15",
        name: "Quận Gò Vấp",
    },
    {
        id: "16",
        name: "Quận Phú Nhuận",
    },
    {
        id: "17",
        name: "Hóc Môn",
    },
    {
        id: "18",
        name: "Củ Chi",
    },
    {
        id: "19",
        name: "Nhà Bè",
    },
    {
        id: "20",
        name: "Bình Chánh",
    },
    {
        id: "21",
        name: "Cần Giờ",
    }
]

export const locationDistrict_TD = [
    {
        id: "22",
        name: "Quận Thủ Đức",
    },
    {
        id: "23",
        name: "Quận 9",
    },
    {
        id: "24",
        name: "Quận 2",
    }
]

export const listTitlePolicy = [
    { label: "Tổng quan" },
    { label: "Chính sách đăng ký thành viên" },
    { label: "Chính sách đặt chỗ cùng VBM" },
    { label: "Chính sách hủy đặt chỗ" },
    { label: "Chính sách tạo bài đăng" },
    { label: "Chính sách báo cáo" },
    { label: "Chính sách xử lý báo cáo bài đăng" },
    { label: "Chính sách nạp tiền" },
    { label: "Chính sách đẩy bài viết" },
]

export const listOverviewPolicy = [
    { content: "Khi sử dụng trang web này, bạn đồng ý tuân thủ các điều khoản và điều kiện được quy định trong chính sách này và các chính sách khác của chúng tôi." },
    { content: "Bạn không được sử dụng trang web này cho bất kỳ mục đích bất hợp pháp, vi phạm pháp luật, xâm phạm quyền của người khác hoặc gây hại cho trang web hoặc người sử dụng trang web." },
    { content: "Bạn không được sao chép, phân phối, sửa đổi, tái bản, xuất bản, hiển thị, truyền hoặc tạo các sản phẩm phát sinh từ bất kỳ nội dung nào trên trang web này mà không có sự cho phép bằng văn bản của chúng tôi." },
    { content: "Bạn không được sử dụng trang web này để gửi hoặc nhận bất kỳ thông tin cá nhân nào mà không có sự đồng ý của người liên quan hoặc vi phạm quyền riêng tư của họ." },
    { content: "Bạn không được sử dụng trang web này để gửi hoặc nhận bất kỳ loại virus, mã độc, mã hóa, mã giả mạo hoặc các tệp nguy hiểm khác có thể làm hỏng, làm gián đoạn hoặc làm tổn hại trang web hoặc thiết bị của người khác." },
    { content: "Bạn không được sử dụng trang web này để quảng cáo, khuyến mại, tiếp thị hoặc bán bất kỳ sản phẩm hoặc dịch vụ nào mà không có sự cho phép của chúng tôi." },
    { content: "Bạn không được sử dụng trang web này để gây quấy rối, lạm dụng, xúc phạm, đe dọa, quấy nhiễu hoặc làm phiền người khác hoặc vi phạm quyền của họ theo bất kỳ cách nào." },
    { content: "Bạn không được sử dụng trang web này để thu thập hoặc lưu trữ bất kỳ thông tin cá nhân nào về người khác mà không có sự cho phép của họ." },
    { content: "Chúng tôi có quyền giám sát, kiểm duyệt, chỉnh sửa hoặc xóa bất kỳ nội dung nào bạn gửi lên trang web này theo quyết định của chúng tôi." },
    { content: "Chúng tôi có quyền hạn chế, tạm ngưng hoặc chấm dứt quyền truy cập của bạn vào toàn bộ hoặc một phần của trang web này vào bất kỳ thời điểm nào mà không cần thông báo trước." },
]

export const listContentPolicy = [
    {
        id: "1",
        label: "Chính sách đăng ký thành viên",
        header: "Vietnamese Badminton Matching (VBM) này là một nền tảng cung cấp các dịch vụ trực tuyến liên quan đến dịch vụ thể thao. Để sử dụng các dịch vụ của VBM, bạn cần đăng ký thành viên và tuân thủ các quy định sau:",
        body: [
            { subContent: "Bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật về bản thân khi đăng ký thành viên." },
            { subContent: "Bạn phải bảo mật tài khoản và mật khẩu của mình và không chia sẻ cho bất kỳ ai." },
            { subContent: "Bạn phải chịu trách nhiệm về mọi hoạt động xảy ra trên tài khoản của mình và thông báo ngay cho VBM nếu phát hiện bất kỳ sự vi phạm nào." },
            { subContent: "Bạn không được sử dụng tài khoản của người khác hoặc cho phép người khác sử dụng tài khoản của bạn mà không có sự cho phép của VBM." },
            { subContent: "Bạn không được sử dụng VBM để phát tán, chia sẻ hoặc lưu trữ bất kỳ nội dung nào vi phạm pháp luật, thuần phong mỹ tục hoặc quyền lợi của bên thứ ba." },
            { subContent: "Bạn không được sử dụng VBM để gây rối, quấy rầy, lừa đảo, đe dọa hoặc xâm phạm quyền riêng tư của người khác." },
            { subContent: "Bạn không được sử dụng VBM để thực hiện bất kỳ hành vi nào gây ảnh hưởng xấu đến hoạt động, an ninh hoặc uy tín của website." },
        ],
        subFinal: "VBM có quyền từ chối, hủy bỏ hoặc đình chỉ tài khoản của bạn nếu bạn vi phạm bất kỳ điều khoản nào trong chính sách này. VBM cũng có quyền thay đổi, cập nhật hoặc bổ sung chính sách này bất cứ lúc nào mà không cần thông báo trước. Bạn có trách nhiệm theo dõi và tuân thủ các thay đổi này.",
        final: "Bằng việc đăng ký thành viên, bạn đã đồng ý với các điều khoản và điều kiện trong chính sách này. Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào về chính sách này, xin vui lòng liên hệ với VBM qua email:",
        email: "atbglad@gmail.com."
    },
    {
        id: "2",
        label: "Chính sách đặt chỗ cùng VBM",
        header: "Chính sách về đặt chỗ của chúng tôi nhằm đảm bảo rằng bạn có thể đặt chỗ một cách dễ dàng và nhanh chóng, cũng như hủy đặt chỗ của bạn khi cần thiết.",
        body: "Để đặt chỗ, bạn cần cung cấp thông tin cá nhân, số lượng người tham gia, ngày và giờ đến, và phương thức thanh toán.",
        subFinal: "Bạn sẽ nhận được xác nhận đặt chỗ qua email hoặc tin nhắn điện thoại. Nếu bạn muốn hủy hoặc thay đổi đặt chỗ của bạn, bạn cần liên hệ với chúng tôi ít nhất 24 giờ trước thời gian đến.",
        final: "Chúng tôi mong rằng bạn sẽ tuân thủ chính sách về đặt chỗ của chúng tôi để giúp chúng tôi phục vụ bạn tốt hơn."
    },
    {
        id: "3",
        label: "Chính sách hủy đặt chỗ",
        header: "Chính sách về hủy đặt chỗ của chúng tôi nhằm bảo vệ quyền lợi của nhứng người dung trong hệ thống. Khi bạn đặt chỗ một dịch vụ trên VBM của chúng tôi, bạn đồng ý tuân thủ các điều khoản và điều kiện sau:",
        body: [
            { subContent: "Bạn có thể hủy đặt chỗ miễn phí trong vòng 24 giờ kể từ thời điểm xác nhận đặt chỗ." },
            { subContent: "Nếu bạn hủy đặt chỗ sau thời hạn miễn phí, bạn sẽ phải trả một khoản phí hủy đặt chỗ tương ứng với giá trị của dịch vụ hoặc một phần của nó, tùy thuộc vào thời gian hủy và chính sách của đối tác cung cấp dịch vụ." },
            { subContent: "Bạn có thể yêu cầu hoàn tiền hoặc thay đổi ngày sử dụng dịch vụ trong trường hợp có sự cố bất khả kháng, như thiên tai, dịch bệnh, chiến tranh, khủng bố, hoặc các sự kiện khác không do bạn gây ra." },
            { subContent: "Bạn có thể liên hệ với với người chủ bài đănghoặc chúng tôi để có thể dễ dàng hủy chỗ đặt trước." },
        ]
    },
    {
        id: "4",
        label: "Chính sách tạo bài đăng",
        header: "Chính sách tạo bài đăng của VBM là một tập hợp các quy định và hướng dẫn mà người dùng cần tuân theo khi đăng nội dung lên VBM. Mục đích của chính sách này là để bảo vệ uy tín, an toàn và chất lượng của trang web, cũng như ngăn chặn vi phạm bản quyền, pháp luật hoặc quyền riêng tư của người khác. Chính sách tạo bài đăng của trang web có thể bao gồm các yếu tố sau:",
        body: [
            { subContent: "Tiêu chuẩn về nội dung: VBM có thể yêu cầu người dùng đăng nội dung có liên quan, chính xác, trung thực, thiết thực và hữu ích cho cộng đồng. VBM cũng có thể cấm người dùng đăng nội dung xuyên tạc, sai lệch, lừa đảo, quảng cáo, spam, vi phạm bản quyền, phỉ báng, xúc phạm, kích động, khiêu dâm, bạo lực hoặc bất kỳ nội dung nào khác có thể gây hại cho VBM hoặc người dùng khác." },
            { subContent: "Tiêu chuẩn về hình thức: Trang web có thể yêu cầu người dùng đăng nội dung có định dạng, cấu trúc, ngôn ngữ và chính tả phù hợp với tiêu chuẩn của VBM. VBM cũng có thể yêu cầu người dùng sử dụng các công cụ chỉnh sửa, kiểm tra hoặc xác minh nội dung trước khi đăng. VBM cũng có thể giới hạn kích thước, số lượng hoặc loại nội dung mà người dùng có thể đăng." },
            { subContent: "Quyền và trách nhiệm của người dùng: VBM có thể yêu cầu người dùng chịu trách nhiệm về nội dung mà họ đăng và tuân theo các điều khoản sử dụng, chính sách bảo mật và luật pháp liên quan. VBM cũng có thể yêu cầu người dùng cung cấp thông tin xác thực về bản thân hoặc nội dung mà họ đăng. VBM cũng có thể cho phép người dùng chỉnh sửa, xóa hoặc gỡ bỏ nội dung mà họ đã đăng. VBM cũng có quyền kiểm duyệt, sửa đổi, di chuyển hoặc xóa nội dung mà người dùng đã đăng nếu vi phạm chính sách tạo bài đăng của VBM." },
            { subContent: "Khi tạo quá 3 bài đăng trong một tháng thì bạn sẽ phải trả một mức phí tối thiểu khi đăng bài. Mức phí này sẽ được VBM thông báo ở trang tic tức cũng như cập nhật các thông tin chỉnh sửa chính thức của VBM." },
            { subContent: "Ngoài ra bạn cũng sẽ cần phải trả một mức phí cho mỗi lượt người tham gia dựa trên chính sách phí. Mức phí này sẽ được VBM thông báo ở trang tic tức cũng như cập nhật các thông tin chỉnh sửa chính thức của VBM." },
        ],
        final: "Người dùng cần đọc kỹ và hiểu rõ chính sách tạo bài đăng của VBM trước khi đăng nội dung lên VBM. Nếu người dùng không tuân theo chính sách này, họ có thể bị từ chối quyền truy cập, khóa tài khoản hoặc hủy bỏ nội dung mà họ đã đăng. Ngoài ra, người dùng cũng có thể phải chịu trách nhiệm pháp lý hoặc bồi thường thiệt hại cho VBM hoặc bên thứ ba nếu nội dung mà họ đăng gây ra tranh chấp hoặc tổn thất.",
    },
    {
        id: "5",
        label: "Chính sách báo cáo",
        header: "Chính sách bài đăng bị báo cáo là một phần quan trọng của cộng đồng chúng tôi. Chúng tôi mong muốn tạo ra một môi trường an toàn, thân thiện và tôn trọng cho mọi người. Khi bạn báo cáo một bài đăng, bạn đang giúp chúng tôi duy trì chất lượng và ngăn chặn những hành vi vi phạm. Để báo cáo một bài đăng, bạn chỉ cần nhấn vào nút ba chấm ở góc trên bên phải của bài đăng và chọn lý do báo cáo.",
        subFinal: "Bạn có thể báo cáo vì nhiều lý do khác nhau, như spam, lừa đảo, quấy rối, bạo lực, khiêu dâm, hoặc vi phạm quyền sở hữu trí tuệ. Sau khi bạn báo cáo, chúng tôi sẽ xem xét bài đăng và áp dụng các biện pháp thích hợp theo quy định của chúng tôi.",
        final: "Chúng tôi sẽ thông báo cho bạn kết quả xử lý qua email hoặc tin nhắn. Chúng tôi xin cảm ơn sự hợp tác và đóng góp của bạn.",
    },
    {
        id: "6",
        label: "Chính sách xử lý báo cáo bài đăng",
        header: "Chính sách xử lý báo cáo bài đăng của chúng tôi nhằm đảm bảo rằng nội dung trên VBM của chúng tôi tuân thủ các quy định pháp luật và tiêu chuẩn đạo đức.",
        subFinal: "Khi bạn báo cáo một bài đăng, bạn sẽ được yêu cầu cung cấp lý do và bằng chứng cho việc báo cáo của bạn. Sau đó, nhóm kiểm duyệt của chúng tôi sẽ xem xét báo cáo của bạn và quyết định có xóa bài đăng, cảnh cáo người đăng, hay không có hành động nào.",
        final: "Bạn sẽ nhận được thông báo về kết quả xử lý báo cáo của bạn trong vòng 24 giờ. Chúng tôi khuyến khích bạn sử dụng tính năng báo cáo bài đăng một cách có trách nhiệm và tôn trọng, không lạm dụng hoặc sai mục đích."
    },
    {
        id: "7",
        label: "Chính sách nạp tiền",
        header: "Chính sách nạp tiền là một trong những điều quan trọng nhất mà bạn cần biết khi tham gia vào VBM. Bạn cần chú ý đến các yếu tố sau khi nạp tiền vào tài khoản của mình:",
        body: [
            { subContent: "Phương thức nạp tiền: Bạn có thể chọn nạp tiền qua thẻ ngân hàng, ví điện tử, thẻ cào, mã QR hoặc chuyển khoản ngân hang thông qua ví tín dụng VNPay." },
            { subContent: "Số tiền nạp tối thiểu và tối đa: VBM có quy định riêng về số tiền nạp tối thiểu và tối đa cho mỗi lần giao dịch. Bạn cần tuân thủ quy định này để tránh bị từ chối giao dịch hoặc bị mất phí." },
        ],
        final: "Chính sách nạp tiền là một trong những yếu tố ảnh hưởng đến trải nghiệm của bạn. Bạn nên tìm hiểu kỹ về chính sách này trước khi quyết định nạp tiền vào trang dịch vụ VBM."
    },
    {
        id: "8",
        label: "Chính sách đẩy bài viết",
        header: "Chính sách đẩy bài là một trong những dịch vụ do VBM cung cấp nhầm nâng cao trải nghiệm của người dùng. Dịch vụ đẩy bài nhầm thúc đẩy người dùng có thể tìm kiếm được những người dùng khác có thể nhanh chóng tương tác và tham gia cùng nhau hơn.",
        body: [
            { subContent: "Cách sử dụng dịch vụ đẩy bài: Bạn cần phải mở quản lý danh sách 'Quản lý bài đăng' ô 'Lựa chọn' có phần 'Đẩy bài đăng' và thực hiện các bước đã được ghi sẵn trên màn hình." },
            { subContent: "Mức phí này sẽ được VBM thông báo ở trang tin tức cũng như cập nhật các thông tin chỉnh sửa chính thức của VBM." },
        ],
        final: "Chính sách đẩy bài nhầm tối ưu hóa thông tin khi gợi ý tới những người dùng khác và cải thiện mức độ ưu tiên và trải nghiệm của người dùng tốt hơn."
    }
]

export const listTitleFooter = [
    { title: "Thông Tin chung" },
    { title: "Thông Tin Liên hệ" },
]

export const listOverviewFooter = [
    { label: "Vietnam Badminton Court (VBC)", content: "Là hệ thống các sân cầu lông hàng đầu tại Thành phố Hồ Chí Minh, nơi mang đến trải nghiệm tuyệt vời cho những người đam mê môn thể thao này. Tại VBC, chúng tôi cam kết cung cấp các điều kiện tốt nhất để người chơi có thể tận hưởng và phát triển kỹ năng của mình." },
    { label: "Với sứ mệnh:", content: "Vietnam Badminton Court (VBC) mong muốn có thể tạo ra một môi trường thân thiện, chuyên nghiệp và đầy cảm hứng để phát triển môn thể thao cầu lông tại Việt Nam. Chúng tôi cam kết cung cấp cơ sở vật chất hiện đại, dịch vụ chất lượng cùng đội ngủ quản lí chuyên nghiệp." },
    { label: "Tầm nhìn:", content: "Vietnam Badminton Court (VBC) hướng tới mục tiêu trở thành trung tâm cầu lông hàng đầu tại Việt Nam " },
]

export const listContentFooter = [
    { label: "Hệ thống cửa hàng:", content: "VBC Hiện có 2 chi nhánh trên địa bàn Tp. Hồ Chí Minh" },
    { label: "Chi Nhánh 1:", content: "Số 3 Hòa Bình, Phường 3, Quận 11, TP. Hồ Chí Minh, Việt Nam" },
    { label: "Chi nhánh 2:", content: "208 Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh, Việt Nam" },
    { label: "Hotline", content: "0774676451" },
    { label: "Email", content: "VBCSport@gmail.com" },
]

export const Status = [
    { statusEN: "success", statusVI: "Thành công" },
    { statusEN: "fail", statusVI: "Thất bại" },
]

export const StatusReport = [
    { statusEN: "pending", statusVI: "Đang xử lý" },
    { statusEN: "complete", statusVI: "Đã xử lý" },
]