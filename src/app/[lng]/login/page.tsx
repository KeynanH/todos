'use client'

import '@/i18n'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

interface LoginPageProps {
  params: Promise<{ lng: string}>
}

export default function LoginPage({ params }: LoginPageProps){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { lng } = use(params);
    const {t, i18n} = useTranslation()

    useEffect(() => {
      if(lng && i18n.language !== lng){
        i18n.changeLanguage(lng)
      }
    },[lng, i18n])

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")

        const result = await signIn("credentials", {
            redirect: true,
            callbackUrl: "/",
            email,
            password
        })

        if (result?.error) {
        setError(t('loginerror'));
        }

    }

    return(
        <div className="flex min-h-screen items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold tracking-tight text-black ">
          {t('signintitle')}
        </h2>
        
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              {t('email')}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm "
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              {t('password')}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border bg-gray-50 border-gray-300 px-3 py-2 text-black placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t('signin')}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {t('donthaveaccount')}{" "}
          <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            {t('registerhere')}
          </Link>
        </p>
      </div>
    </div>
    )
}