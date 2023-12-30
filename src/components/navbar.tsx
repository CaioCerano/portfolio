import AnimatedLink from './AnimatedLink'

const Navbar = () => {

    return (
        <header className='fixed w-full flex justify-center mix-blend-difference'>
            <div className="flex w-full max-w-screen-xl items-center place-content-between top-0 pt-12">
                <a href='' className='text-lg lowercase text-text/50 hover:text-text transition duration-500 ease-in-out cursor-none'>Caio Cerano</a>
                <div className="flex flex-row space-x-8 items-center justify-center">
                    <AnimatedLink text='Work' />
                    <AnimatedLink text='About' />
                    <AnimatedLink text='Contact' />
                    <AnimatedLink text='Resume' />
                    <AnimatedLink text='Blog?' />
                </div>
            </div>
        </header>

    )
}

export default Navbar
