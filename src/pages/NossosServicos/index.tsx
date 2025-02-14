import { motion } from "framer-motion";

export function NossosServicos() {
  return (
    <section className="w-full from-gray-100 via-white to-gray-100 py-28 px-10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-4xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Nossos Serviços
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Oferecemos serviços especializados para transformar sua experiência com livros.
          Descubra como podemos ajudar você!
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Seleção Exclusiva",
              description:
                "Curadoria de livros cuidadosamente escolhidos para inspirar e transformar.",
              icon: "📚",
            },
            {
              title: "Entrega Expressa",
              description:
                "Receba seus livros rapidamente, com frete grátis para compras acima de R$ 150.",
              icon: "🚚",
            },
            {
              title: "Clube de Assinaturas",
              description:
                "Assine nosso clube e receba livros surpresa todo mês, com brindes exclusivos.",
              icon: "🎁",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600 text-center">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
