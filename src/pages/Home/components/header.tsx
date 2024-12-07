export function HeaderHome(){
    return (
        <header className="hidden md:flex justify-center items-center w-full h-[525px] mb-2 bg-fundoBanner">

        <div className="w-[20%] bg-no-repeat bg-bottom bg-[length:100%_auto] relative" style={{ backgroundImage: 'url(./assets/images/ellipse.png)' }}>
          <img className="w-full" src="./assets/images/banner.png" alt="banner" />
        </div>
        <h2 className="w-[30%] text-white font-semibold text-4xl px-10 font-rockSalt leading-relaxed text-center">
          The Great Gatsby é o nosso lançamento do momento! Confira em Lançamentos!
        </h2>

      </header>
    )
}