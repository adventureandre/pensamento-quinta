import { Carousel } from "@/components/Carousel";

export function HeaderHome() {
  return (
    <header className="w-full mb-2 box-border">
      <Carousel />
      {/*<div className="w-[20%] bg-no-repeat bg-bottom bg-[length:100%_auto] relative" style={{ backgroundImage: 'url(./assets/images/ellipse.png)' }}>
        <img src="./assets/images/banner/banner-lançamentos.png" alt="" />
      </div>*/}
    </header>
  )
}