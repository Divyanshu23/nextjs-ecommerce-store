import Head from 'next/head'
import Image from 'next/image'


export default function Home() {
  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="NextFashion - E Commerce Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center max-w-6xl">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">Home of Next Generation Fashion</p>
            <h1 className="my-4 text-4xl font-bold leading-tight">
              Immerse yourself into wide ranging collection of NextFashion
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Make your futureself happy making the right decision!
            </p>
            <p className='tracking-loose w-full text-gray-600 font-medium'>Click to join our fashion News Letter</p>
            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Subscribe
            </button>
          </div>
          <div className="relative w-full h-[28rem] md:w-3/5 md:h-[32rem] py-6 text-center">
            <Image alt="hero" src="/hero.png" fill sizes="100vw" style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>
      <div className="relative -mt-12 lg:-mt-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1428 174">
          <g fill="#FFF" fillRule="nonzero">
            <g transform="translate(-2 44)">
              <path
                d="M0 0c90.728.928 147.913 27.188 291.91 59.912C387.908 81.728 543.605 89.335 759 82.732c-289.664 73.522-542.664 70.936-759-7.759"
                opacity="0.1"
              ></path>
              <path
                d="M100 104.708c177.413-32.473 326.148-52.183 446.204-59.13 120.055-6.945 264.32-3.78 432.796 9.496-47.93 1.049-168.697 19.772-362.3 56.17-193.603 36.397-365.837 34.219-516.7-6.536z"
                opacity="0.1"
              ></path>
              <path
                d="M1046 51.652c84.83-22.323 233.083-34.044 393-11.486V120c-167.828-42.056-298.828-64.84-393-68.348z"
                opacity="0.2"
              ></path>
            </g>
            <path
              d="M.457 34.035c56.629 19.163 97.751 31.774 123.365 37.83 57.632 13.63 110.473 18.425 148.211 21.594 39.322 3.3 124.602 2.342 188.992-1.796 25.735-1.653 57.702-5.291 95.901-10.911 38.821-6.156 65.446-10.744 79.873-13.761 27.114-5.667 75.702-17.488 90.806-20.863 52.865-11.811 91.234-23.596 128.719-30.224C922.689 4.169 955.676 2.522 1011.185.432c49.52 1.045 86.205 2.697 110.051 4.955 40.467 3.832 87.385 12.434 114.164 16.917 50.455 8.444 118.951 25.128 205.486 50.05l.305 31.998-1440.07-.321-.664-69.996z"
              transform="translate(-4 76)"
            ></path>
          </g>
        </svg>
      </div>
    </>
  )
}
