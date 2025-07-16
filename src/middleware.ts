import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest){
    const role = req.cookies.get('role')?.value

    if(role !== "pengajar"){
        return NextResponse.redirect(new URL('/', req.url))
    }

    // if(role === "pengajar"){
    //     return NextResponse.redirect(new URL('/Teacher', req.url))
    // }
    return NextResponse.next()
}

export const config = {
    matcher: ["/Teacher/:path*"]
}