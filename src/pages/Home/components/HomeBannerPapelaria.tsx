import { Link } from 'react-router-dom';

export const HomeBannerPapelaria = () => {
  return (
    <section className="flex flex-col items-center">
    <div className="w-full overflow-hidden transition-transform duration-300 hover:scale-[1.02] my-4">
      <Link to="/papelariaafetiva" className="block w-full">
        <img
          src="/assets/images/banner/banner_homepage_papelaria.png"
          alt="Banner Papelaria Afetiva"
          className="w-full h-auto object-cover cursor-pointer max-w-screen-xl max-h-[600px] mx-auto"
        />
      </Link>
    </div>
    <hr className="border-t border-black border-opacity-25 w-[50%] mt-10" />
    </section>
  );
};
