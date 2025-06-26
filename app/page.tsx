import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className='w-full flex justify-center items-center flex-col'>
      <h1 className='mt-5 text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl text-center'>
        Discover & Share
        <br className="max-md:hidden" />
        <span className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent'>
          AI-Powerd Prompts
        </span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-center">
        promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts.
      </p>

      <Feed />
    </section>
  )
}

export default Home