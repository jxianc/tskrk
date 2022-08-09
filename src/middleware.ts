import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.split('/').pop()

  const dataFetch = await fetch(`${req.nextUrl.origin}/api/redirect/${slug}`)

  if (dataFetch.status === 404) {
    return NextResponse.redirect(req.nextUrl.origin)
  }

  const link = await dataFetch.json()

  if (link?.url) {
    return NextResponse.redirect(link.url)
  }
}

// config with custom matcher
export const config = {
  matcher: '/:slug',
}
