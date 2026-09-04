'use client'

import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";


export default function RegisterPage() {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Something went wrong.");
                setIsLoading(false);
                return;
            }

            await signIn("credentials", {
                redirect: true,
                callbackUrl: "/", // Instantly brings them to your protected main page.tsx
                email,
                password,
            });
        } catch (error) {
            setError("Failed to connect to the server.");
            return
        } finally{
            setIsLoading(false);
        }
    }
    return (
          <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create a new account
        </h2>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            {isLoading ? "Registering & Logging in..." : "Register"}
          </button>
        </form>
      </div>
    </div>
    )
}