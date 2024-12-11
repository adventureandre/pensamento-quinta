import { useState } from 'react';
import { ShoppingCart, List, UserCircle, MagnifyingGlass } from 'phosphor-react';
import { Link } from 'react-router-dom';
import logo from '../../public/assets/images/logo.jpeg';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="pt-6 max-w-[1600px] w-full pb-6">
                <div className='flex flex-row justify-between items-center px-5 gap-10 sm:gap-1'>
                    {/* Banner */}
                    <Link className='flex flex-row gap-3 w-[500px] items-center' to="/">
                        <img src={logo} alt="Pensamentos de quinta" className="w-[100px] min-w-20" />
                        <h1 className='font-playfair font-bold text-sm hidden md:block'>A Editora Que Vai Te Encantar!!</h1>
                    </Link>

                    {/* Menu */}
                    <nav className="hidden md:block w-full mt-3 py-1 text-sm font-bold">
                        <ul className="flex flex-row gap-12 justify-center">
                            <li><Link className='hover:underline underline-offset-2' to="/quemsomos">Quem Somos</Link></li>
                            <li><Link className='hover:underline underline-offset-2' to="/nossosservicos">Nossos Serviços</Link></li>
                            <li><Link className='hover:underline underline-offset-2' to="/nossoslivros">Nossos Livros</Link></li>
                            <li><Link className='hover:underline underline-offset-2' to="/nossosautores">Nossos Autores</Link></li>
                        </ul>
                    </nav>

                    <form action="">
                        <label htmlFor="search" className='flex rounded-full border border-spacing-2 bg-input bg-opacity-70 px-3 pt-1'>
                            <input className='bg-inherit outline-none text-sm text-slate-800' id='search' type="search" placeholder='Digite o que você procura' />
                            <MagnifyingGlass size={20} />
                        </label>
                    </form>

                    <div className="flex flex-row items-center gap-1">
                        <div className='flex gap-2 w-[180px]'>
                            <Link to="/login">
                            <UserCircle size={52} weight="fill" />
                            </Link>
                            <div className='flex-col hidden lg:flex'>
                                <span className='text-sm'>Bem-vindo(a)</span>
                                <Link className='font-bold text-xs' to="/dashboard/inicio">Entrar ou Cadastrar</Link>
                            </div>
                        </div>
                        <Link to="/checkout" aria-disabled className="relative p-2 bg-secondary rounded-md [&[aria-disabled='true']]:pointer-events-none">
                            <ShoppingCart size={22} weight="fill" />
                            <span className="w-5 h-5 rounded-full bg-accent absolute right-[-8.345px] top-[-8px] flex justify-center items-center">2</span>
                        </Link>

                        {/* menu mobile */}
                        <button
                            className="block md:hidden p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <List size={32} />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <nav className="absolute top-[50%] right-[50%] transform translate-x-1/2 translate-y-1/2 mt-2 bg-secondary shadow-md rounded-md md:hidden w-[250px]">
                        <ul className="flex flex-col gap-4 p-4">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="#">Nossos Livros</Link></li>
                            <li><Link to="/quemsomos">Quem Somos</Link></li>
                            <li><Link to="#">Autores</Link></li>
                        </ul>
                    </nav>
                )}
            </header>
            <div className='w-full p-1' style={{
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}></div>
        </>
    );
}
