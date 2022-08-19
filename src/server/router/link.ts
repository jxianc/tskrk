import { createRouter } from './context'
import { z } from 'zod'

export const linkRouter = createRouter()
  .query('verifySlug', {
    input: z.object({
      slug: z.string(),
    }),
    async resolve({ input, ctx }) {
      const link = await ctx.prisma.link.findUnique({
        where: {
          slug: input.slug,
        },
      })
      if (link) {
        return {
          success: false,
          msg: 'slug already used',
        }
      }
      return {
        success: true,
      }
    },
  })
  .mutation('shortenLink', {
    input: z.object({
      slug: z.string(),
      url: z.string(),
    }),
    async resolve({ input: { slug, url }, ctx }) {
      try {
        await ctx.prisma.link.create({
          data: {
            slug,
            url,
          },
        })

        return {
          success: true,
        }
      } catch (err) {
        return {
          success: false,
        }
      }
    },
  })
