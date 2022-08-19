import React, { useState } from 'react'
import debounce from 'lodash/debounce'
import { trpc } from '../utils/trpc'
import { cn } from '../utils/cn'
import NextLink from 'next/link'
import copy from 'copy-to-clipboard'

interface ShortenFormProps {}

interface Form {
  url: string
  slug: string
}

export const ShortenForm: React.FC<ShortenFormProps> = ({}) => {
  const [form, setForm] = useState<Form>({ slug: '', url: '' })
  const verifySlug = trpc.useQuery(['link.verifySlug', { slug: form.slug }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })
  const shortenLink = trpc.useMutation(['link.shortenLink'])

  console.log(shortenLink)

  const inputStyle =
    'w-full my-2 px-3 py-1 bg-white dark:bg-zinc-700 border-2 border-gray-200 dark:border-zinc-500 placeholder-gray-400 focus:outline-none focus:border-gray-400 dark:focus:border-gray-300 focus:z-10 text-sm rounded-[0.3rem]'
  const buttonStyle =
    'mt-2 w-full px-2 py-1.5 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black/90 focus:ring-gray-400 dark:focus:ring-gray-300 text-sm text-gray-700 dark:text-gray-100 font-medium rounded-[0.3rem]'

  if (shortenLink.status === 'success') {
    const shortenedLink = `https://tskrk.site/${form.slug}`

    return (
      <div>
        <div className="flex items-baseline space-x-3">
          <NextLink href={shortenedLink}>
            <a
              target="_blank"
              className="text-blue-500 hover:underline focus:outline-none"
            >
              {shortenedLink}
            </a>
          </NextLink>
          <button
            className={cn(buttonStyle, 'px-4')}
            onClick={() => {
              copy(shortenedLink)
            }}
          >
            copy
          </button>
        </div>
        <button
          className={buttonStyle}
          onClick={() => {
            shortenLink.reset()
            setForm({ slug: '', url: '' })
          }}
        >
          back
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        shortenLink.mutate({
          ...form,
        })
      }}
    >
      <div className="flex items-center space-x-2">
        <label>URL</label>
        <input
          className={inputStyle}
          name="url"
          type="url"
          placeholder="https://example.com"
          required
          onChange={(e) => {
            setForm({ ...form, url: e.target.value })
          }}
        />
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-blue-500">https://tskrk.site/</label>
        <input
          className={cn(
            inputStyle,
            verifySlug.isFetched && !verifySlug.data!.success
              ? 'border-red-400 dark:border-red-400 focus:border-red-400 dark:focus:border-red-400'
              : '',
          )}
          name="slug"
          type="text"
          placeholder="slug"
          required
          onChange={(e) => {
            setForm({ ...form, slug: e.target.value })
            debounce(verifySlug.refetch, 100)
          }}
        />
      </div>
      {verifySlug.data?.msg && (
        <div className="text-red-400 text-sm font-semibold">
          {verifySlug.data?.msg}
        </div>
      )}
      <button
        type="submit"
        disabled={verifySlug.isFetched && !verifySlug.data!.success}
        className={buttonStyle}
      >
        shorten
      </button>
    </form>
  )
}
