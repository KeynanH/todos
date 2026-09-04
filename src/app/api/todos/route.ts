import { hygraphAdminClient, hygraphClient } from "@/graphql/client";
import { CREATE_TODO_MUTATION } from "@/graphql/mutations";
import { GET_USER_TODOS_QUERY } from "@/graphql/queries";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await hygraphClient.request<{tasks: any[]}>(GET_USER_TODOS_QUERY)
    return NextResponse.json(data.tasks)
}

export async function POST(req: Request) {
    const {
        id,
        title,
        completed,
        description,
        dueDate, 
    } = await req.json()
    const result: any = await hygraphAdminClient.request(CREATE_TODO_MUTATION, {
        id,
        title,
        completed,
        description,
        dueDate, 
    })
}