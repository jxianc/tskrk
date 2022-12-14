import type { NextPage } from 'next'
import { FaGithub, FaRegMoon, FaRegSun } from 'react-icons/fa'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { ShortenForm } from '../components/ShortenForm'

const Home: NextPage = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-white dark:bg-black/30 flex flex-col min-h-screen max-h-screen text-center items-center justify-center">
      <div className="mb-4">
        <div className="font-bold mb-2">
          <h1 className="text-xl">tskrk</h1>
          <p>短縮リンク</p>
        </div>
        <h2>a link shortener using customizable slug</h2>
      </div>
      <ShortenForm />
      <div className="mt-12 space-x-4">
        <NextLink href="https://github.com/jxianc/tskrk" passHref>
          <a target="_blank" className="focus:outline-none">
            <button className="p-2 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black/90 focus:ring-gray-400 dark:focus:ring-gray-300 text-sm text-gray-700 dark:text-gray-100 font-medium rounded-[0.3rem]">
              <FaGithub size={20} />
            </button>
          </a>
        </NextLink>
        {mounted && (
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="p-2 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black/90 focus:ring-gray-400 dark:focus:ring-gray-300 text-sm text-gray-700 dark:text-gray-100 font-medium rounded-[0.3rem]"
            onClick={() => {
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }}
          >
            {resolvedTheme === 'dark' ? (
              <FaRegSun size={20} />
            ) : (
              <FaRegMoon size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default Home
