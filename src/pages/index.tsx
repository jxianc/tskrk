import { Form, Formik } from 'formik'
import type { NextPage } from 'next'
import { InputField } from '../components/InputField'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col space-y-4 min-h-screen max-h-screen text-center items-center justify-center">
      <div>
        <h1 className="font-bold text-xl">TSKRK</h1>
        <h2>a link shortener using customizable slug</h2>
      </div>
      <Formik
        initialValues={{
          url: '',
          slug: '',
        }}
        onSubmit={({ url, slug }) => {
          console.log(url, slug)
        }}
      >
        {() => (
          <Form>
            <InputField
              name="url"
              label="URL"
              type="url"
              placeholder="https://example.com"
              required
            />
            <InputField
              name="slug"
              label="https://tskrk.site/"
              type="text"
              placeholder="slug"
              isPreviewLink
              required
            />
            <button
              type="button"
              className="mt-2 w-full px-2 py-1.5 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 text-sm text-gray-700 font-medium rounded-[0.3rem]"
              onClick={() => {
                console.log('random')
              }}
            >
              shorten
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Home
