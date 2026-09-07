import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GraphQLClient } from "graphql-request";
import {  
  CREATE_TODO_MUTATION, 
  UPDATE_TODO_MUTATION, 
  DELETE_TODO_MUTATION 
} from "@/graphql/mutations";
import { GET_USER_TODOS_QUERY } from "@/graphql/queries";

const hygraphClient = new GraphQLClient(process.env.HYGRAPH_API_ENDPOINT!, {
  headers: { Authorization: `Bearer ${process.env.HYGRAPH_API_TOKEN}` },
});

// 1. GET: Fetch all todos 
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data: any = await hygraphClient.request(GET_USER_TODOS_QUERY, {
      userID: (session.user as any).id,
    });

    return NextResponse.json(data?.todos || [], { status: 200 });
  } catch (error) {
    console.error("Fetch Error:", error);
    return NextResponse.json({ error: "Failed to read items" }, { status: 500 });
  }
}

// 2. POST: Create Todo
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, dueDate } = await req.json();
    if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

    const data = await hygraphClient.request(CREATE_TODO_MUTATION, {
      title,
      description: description || "",
      dueDate: dueDate || null,
      completed: false,
      userID: (session.user as any).id,
    });

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("Create Error:", error);
    return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
  }
}

// 3. PUT: update Todo
export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, completed } = await req.json();
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const data = await hygraphClient.request(UPDATE_TODO_MUTATION, {
      id,
      completed,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
  }
}

// 4. DELETE Todo
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const data = await hygraphClient.request(DELETE_TODO_MUTATION, { id });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}