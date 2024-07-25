import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

export async function middleware(req: NextRequest) {
    // const cookies = req.cookies.get("token")
    // const token = cookies?.value

    // const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    // const url = req.nextUrl

    // try {
    //     if (url.pathname.startsWith("/user/setting-profile") ||
    //         url.pathname.startsWith("/user/setting-ban") ||
    //         url.pathname.startsWith("/user/setting-security") ||
    //         url.pathname.startsWith("/user/setting-notify") ||
    //         url.pathname.startsWith("/product/post-product") ||
    //         url.pathname.startsWith("/product/management-product") ||
    //         url.pathname.startsWith("/transaction") ||
    //         url.pathname.startsWith("/user/wallet")) {
    //         if (!token) {
    //             return NextResponse.redirect(`${url.origin}/unauthorized`)
    //         }

    //         if (token) {
    //             const { payload } = await jose.jwtVerify(token, secret)
    //             if (payload.Role !== "2") {
    //                 return NextResponse.redirect(`${url.origin}/unauthorized`)
    //             }
    //         }
    //     }

    //     if (url.pathname.startsWith("/admin")) {
    //         if (!token) {
    //             return NextResponse.redirect(`${url.origin}/unauthorized`)
    //         }

    //         if (token) {
    //             const { payload } = await jose.jwtVerify(token, secret)
    //             if (payload.Role !== "1" && payload.Role !== "3") {
    //                 return NextResponse.redirect(`${url.origin}/unauthorized`)
    //             }
    //         }
    //     }

    //     if (url.pathname.startsWith("/register-stepper")) {
    //         if (!token) {
    //             return NextResponse.redirect(`${url.origin}/unauthorized`)
    //         }

    //         if (token) {
    //             const { payload } = await jose.jwtVerify(token, secret)
    //             if (!payload.IsNewUser || payload.IsNewUser === "False") {
    //                 return NextResponse.redirect(`${url.origin}/unauthorized`)
    //             }
    //         }
    //     }
    // } catch (e) {
    //     // console.log(e)
    //     return NextResponse.redirect(`${url.origin}/`)
    // }

    // return NextResponse.next()
}

export const config = {
    matcher: [
        "/user/setting-ban",
        "/user/setting-profile",
        "/user/setting-notify",
        "/user/setting-security",
        "/product/post-product",
        "/product/management-product",
        "/register-stepper",
        "/user/wallet/:path*",
        "/user/chat-room",
        "/admin/:path*",
        "/transaction/:path*",
    ],
}
