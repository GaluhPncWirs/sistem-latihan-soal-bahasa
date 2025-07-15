import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";



const onlyTeacher = ["/Teacher"]

export default function forAuth(middleware: NextMiddleware, requireAuth : string[] = []){
    return async function (req:NextRequest, next: NextFetchEvent) {
        const path = req.nextUrl.pathname
        // if(requireAuth.includes(path)){
        //     const toke = await 
        // }
    }
}