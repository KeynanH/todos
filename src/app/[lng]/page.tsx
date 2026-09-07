
import "../../styles/globals.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TodoDashboard from "@/components/TodoDashboard";
import en from "../../locales/en.json"
import de from "../../locales/de.json"

const translations: Record<string, typeof en> = { en, de };

interface HomeProps {
  params: Promise<{ lng: string}>
}

export default async function Home({params}: HomeProps) {
  
  const { lng } = await params;
  const t = translations[lng] || translations['en'];

  const session = await getServerSession(authOptions)
    if (!session) {
    redirect("/login");
  }
  
  return <TodoDashboard session={session} />
}