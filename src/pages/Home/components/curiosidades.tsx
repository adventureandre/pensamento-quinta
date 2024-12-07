export function CuriosidadeHome() {
    return (
        <section className=" flex justify-center mt-20">
            <div className="w-[50%] flex flex-col items-center justify-center ">
                <h1 className="font-playfair pt-3 px-3 border w-[80%] text-center">Curiosidades Sobre a Pensamentos de Quinta</h1>
                <article className="flex gap-4 mt-6">
                    <img className="w-[360px] h-[477px]" src="./assets/images/curiosidade.png" alt="Imagem ilustrativa de curiosidade" />
                    <header>
                        <h2 className="text-2xl mb-3 font-bold">O Papel do Editor Vai Além da Revisão</h2>
                        <li className="text-sm">
                            <span className="font-bold text-base">O Papel do Editor Vai Além da Revisão:</span>
                            Editoras não apenas corrigem textos: O trabalho envolve selecionar manuscritos, ajudar autores a aprimorar suas obras, escolher títulos, criar estratégias de marketing e até decidir o design das capas.
                            Um editor atua como o "curador" da obra, equilibrando a visão do autor com as expectativas do mercado.
                        </li>
                        <hr />
                        <li>
                            <span className="font-bold">Muitas Editoras Começaram em Garagens ou Pequenos Espaços:</span>
                            O mercado editorial teve seu início em pequenos ambientes, onde os primeiros editores começaram suas operações em locais improvisados, como garagens ou escritórios pequenos.
                        </li>
                        <hr />
                        <p>
                            <span className="font-bold">Livros Rejeitados Podem se Tornar Sucessos:</span>
                            Muitos livros que foram inicialmente rejeitados por editoras acabaram se tornando grandes sucessos de vendas, como "Harry Potter", que foi recusado por várias editoras antes de ser publicado.
                        </p>
                    </header>
                </article>
            </div>
        </section>
    );
}
