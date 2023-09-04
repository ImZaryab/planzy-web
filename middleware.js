import { NextResponse } from "next/server";

export default function middleware(req){
    let loginCookie = req.cookies.get("loggedIn");
    let url = req.url;

    if(!loginCookie && url.includes("/menu")){
        return NextResponse.redirect("http://localhost:3000/");
    }

    if(loginCookie && url === "http://localhost:3000/"){
        return NextResponse.redirect("http://localhost:3000/menu");
    }
}