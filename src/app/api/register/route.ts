import { CREATE_USER_MUTATION } from "@/graphql/mutations";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import bcrypt from "bcryptjs";
import { error } from "console";
import { GraphQLClient } from "graphql-request";
import { NextResponse } from "next/server";


const hygraphClient = new GraphQLClient(process.env.HYGRAPH_API_ENDPOINT!, {
    headers: { Authorization: `Bearer ${process.env.HYGRAPH_API_TOKEN}`}
})

export async function POST(req: Request) {
    try {
        const {email, password} = await req.json()

        if(!email || !password) {
            return NextResponse.json({ error: "Email and password required"}, {status: 400})
        }
        
        const formattedEmail = email.toLowerCase()

        const existing: any = await hygraphClient.request(GET_USER_BY_EMAIL, { email: formattedEmail });
            if (existing.hygraphUser) {
                return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
        }
            console.log('email accepted')
        const hashedPassword = await bcrypt.hash(password, 12)

        await hygraphClient.request(CREATE_USER_MUTATION, {
            email: formattedEmail,
            password: hashedPassword
        })

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
    
}