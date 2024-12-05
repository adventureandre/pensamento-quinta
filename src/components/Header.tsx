import { useState } from 'react';
import { ShoppingCart, List, UserCircle } from 'phosphor-react';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="pt-6 max-w-[1400px] w-full">
            <div className='flex flex-row justify-between items-center px-12'>
                <Link to="/">
                    <img src="assets/images/logo.jpeg" alt="Coffee Delivery" className="w-[80px]" />
                </Link>

                <div className="flex flex-row items-center gap-4">
                    <div className='flex  gap-3'>
                        <UserCircle size={52} weight="fill" />
                        <div className='flex flex-col'>
                            <span>Bem-vindo(a)</span>
                            <Link className='font-bold'
                                to="/">Entrar ou Cadastrar</Link>
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


            <nav className="hidden md:block bg-secondary w-full mt-3 py-1 text-white font-bold">
                <ul className="flex flex-row gap-12 justify-center">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Nossos Livros</a></li>
                    <li><a href="#">Quem Somos</a></li>
                    <li><a href="#">Autores</a></li>
                </ul>
            </nav>


            {isMenuOpen && (
                <nav className="absolute top-[50%] right-[50%] transform translate-x-1/2 translate-y-1/2 mt-2 bg-secondary shadow-md rounded-md md:hidden w-[250px]">
                    <ul className="flex flex-col gap-4 p-4">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Nossos Livros</a></li>
                        <li><a href="#">Quem Somos</a></li>
                        <li><a href="#">Autores</a></li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
