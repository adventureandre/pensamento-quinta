import { useState } from 'react';
import { List, UserCircle, MagnifyingGlass, Heart } from 'phosphor-react';
import { GiShoppingCart } from "react-icons/gi";
import { Link } from 'react-router-dom';
import logo from '../../public/assets/images/logo.jpeg';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="max-w-[1910px] w-full p-3">
                <div className='w-full flex justify-around items-center sm:gap-1'>
                    {/* Banner */}
                    <Link className='flex flex-row gap-3 w-[280px] items-center' to="/">
                        <img src={logo} alt="Pensamentos de quinta" className=" w-[80px] ms:w-[160px] min-w-20" />
                        <h1 className='font-playfair font-semibold text-xl hidden md:block'>A Editora Que Vai Te Encantar!!</h1>
                    </Link>

                    {/* Menu */}
                    <nav className="hidden md:block py-1 text-sm font-bold">
                        <ul className="flex flex-row gap-12 justify-center">
                            <li><Link className='transition duration-0 hover:duration-300 hover:border-[#000000] hover:border-b-2' to="/quemsomos">Papelaria Afetiva</Link></li>
                            <li><Link className='transition duration-0 hover:duration-300 hover:border-[#000000] hover:border-b-2' to="/quemsomos">Quem Somos</Link></li>
                            <li><Link className='transition duration-0 hover:duration-300 hover:border-[#000000] hover:border-b-2' to="/nossosservicos">Nossos Serviços</Link></li>
                            <li><Link className='transition duration-0 hover:duration-300 hover:border-[#000000] hover:border-b-2' to="/nossoslivros">Nossos Livros</Link></li>
                            <li><Link className='transition duration-0 hover:duration-300 hover:border-[#000000] hover:border-b-2' to="/nossosautores">Nossos Autores</Link></li>
                        </ul>
                    </nav>

                    <form className='hidden md:flex' action="">
                        <label htmlFor="search" className='flex w-full justify-around items-center p-1 rounded-full border-solid border border-gray-500  bg-input bg-opacity-70 px-3 pt-1' style={{
                            boxShadow: '1px 4px 5px rgba(0, 0, 0, 0.29)',
                        }}>
                            <input className='bg-transparent w-[200px] outline-none text-sm text-slate-800 cursor-pointer' id='search' type="search" placeholder='Digite o que você procura' />
                            <MagnifyingGlass size={20} />
                        </label>
                    </form>

                    <div className="flex flex-row items-center gap-5 md:gap-1">
                        <div className='flex justify-around items-center md:w-[288px]'>
                            {/* Somente para visualizar */}
                            <Link className='hidden md:block' to="/dashboard/favoritos">
                                <Heart size={25} weight='fill' className='transition duration-0 hover:duration-150 hover:fill-[#566150]' />
                            </Link>
                            <Link to="/checkout" aria-disabled className="relative">
                                <GiShoppingCart size={30} />
                                {/*<span className="w-5 h-5 rounded-full bg-accent absolute right-[-8.345px] top-[-8px] flex justify-center items-center">2</span>*/}
                            </Link>
                            <Link to="/login">
                                <UserCircle size={35} weight="fill" />
                            </Link>
                           
                            <p className='hidden md:block'>Dashboard Adm</p>
                        </div>


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
