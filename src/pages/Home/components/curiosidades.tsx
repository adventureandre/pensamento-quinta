export function CuriosidadeHome() {
    return (
            <section className=" flex justify-center flex-wrap gap-10 mt-20 items-center">
                <div className="w-[80%] flex flex-col items-center justify-center ">

                    <div className=" bg-[#b3b79256] w-[70%] flex justify-center p-2 mb-5">
                        <h1 className="font-playfair pt-3 px-3 border w-full text-center bg-white mb-[-16px]">
                            Curiosidades Sobre a Pensamentos de Quinta
                        </h1>
                    </div>

                    <article className="flex gap-4 mt-6">
                        <img className="w-[360px] h-[477px]" src="./assets/images/curiosidade.png" alt="Imagem ilustrativa de curiosidade" />
                        <header className=" w-full">
                            <h2 className="text-2xl mb-3 font-playfair font-light ">O Papel do Editor Vai Além da Revisão</h2>
                            <p className="text-sm mb-2 mt-2">
                                <span className="font-bold text-base block font-playfair">O Papel do Editor Vai Além da Revisão</span>
                                Editoras não apenas corrigem textos: O trabalho envolve selecionar manuscritos, ajudar autores a aprimorar suas obras, escolher títulos, criar estratégias de marketing e até decidir o design das capas.
                                Um editor atua como o "curador" da obra, equilibrando a visão do autor com as expectativas do mercado.
                            </p>
                            <hr />
                            <p className=" text-sm mb-2 mt-2">
                                <span className="font-bold text-base block font-playfair">Muitas Editoras Começaram em Garagens ou Pequenos Espaços</span>
                                O mercado editorial teve seu início em pequenos ambientes, onde os primeiros editores começaram suas operações em locais improvisados, como garagens ou escritórios pequenos.
                            </p>
                            <hr />
                            <p className=" text-sm mb-2 mt-2">
                                <span className="font-bold text-base block font-playfair">Livros Rejeitados Podem se Tornar Sucessos</span>
                                Muitos livros que foram inicialmente rejeitados por editoras acabaram se tornando grandes sucessos de vendas, como "Harry Potter", que foi recusado por várias editoras antes de ser publicado.
                            </p>
                        </header>
                    </article>
                </div>
                <hr className="bg-black p-[0.4px] w-[50%]" />
            </section>
    
    );
}
