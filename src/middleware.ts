import type { NextRequest} from "next/server";
import { NextResponse} from "next/server";
import Session from "./service/Session";

export default function middleware(request: NextRequest) {
    if (!Session.exists() && request.nextUrl.pathname.includes("/auth/signin")) 
        return NextResponse.rewrite(new URL("/auth/signin", request.url));
    
    // redirect any requests directly to home
    if (request.nextUrl.pathname === "/") {
        return NextResponse.rewrite(new URL("/home", request.url));
    }
}