
import "../../styles/globals.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TodoDashboard from "@/components/TodoDashboard";
import Header from "@/components/header";


interface HomeProps {
  params: Promise<{ lng: string}>
}

export default async function Home({params}: HomeProps) {
  
  const { lng } = await params;


  const session = await getServerSession(authOptions)
    if (!session) {
    redirect("/login");
  }
  
  return <>
  <TodoDashboard session={session} lng={lng} />
  </>

}