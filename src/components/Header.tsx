import { useState } from 'react';
import { ShoppingCart, List } from 'phosphor-react';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="mt-6 flex justify-between items-center">
            <nav className="hidden md:block">
                <ul className="flex flex-row gap-12">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Our Shop</a></li>
                    <li><a href="#">Contact US</a></li>
                </ul>
            </nav>

            <Link to="/">
                <img src="assets/images/logo.jpeg" alt="Coffee Delivery" className="w-[80px]" />
            </Link>

            <div className="flex flex-row items-center gap-2">
                <Link to="/checkout" aria-disabled className="relative p-2 bg-secondary rounded-md [&[aria-disabled='true']]:pointer-events-none">
                    <ShoppingCart size={22} weight="fill" />
                    <span className="w-5 h-5 rounded-full bg-accent absolute right-[-8.345px] top-[-8px] flex justify-center items-center">2</span>
                </Link>
                <button className=" flex-row p-2 justify-center items-center gap-1 text-purple-600 bg-primary rounded-md hidden md:block">GET FOR FREE</button>
            <button
                className="block md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <List size={32} />
            </button>
            </div>


            {isMenuOpen && (
                <nav className="absolute top-[50%] right-[50%] transform translate-x-1/2 translate-y-1/2 mt-2 bg-secondary shadow-md rounded-md md:hidden w-[250px]">
                <ul className="flex flex-col gap-4 p-4">
                  <li><a href="/">Home</a></li>
                  <li><a href="/">Our Shop</a></li>
                  <li><a href="/">Contact US</a></li>
                </ul>
              </nav>
            )}
        </header>
    );
}
