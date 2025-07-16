import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest){
    const role = req.cookies.get('role')?.value

    if(req.nextUrl.pathname.startsWith("/Teacher") && role !== "pengajar"){
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/Teacher/:path*"]
}