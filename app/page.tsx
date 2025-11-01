import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/products';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1602874801007-e7b2f186c8a8?w=1920&q=80"
            alt="Hero"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Sonin
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Velas Aromáticas & Óleos Essenciais
          </p>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Descubra a elegância e o bem-estar através de fragrâncias artesanais que transformam seu espaço em um refúgio de tranquilidade.
          </p>
          <Link
            href="/produtos"
            className="inline-block bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-primary-900 mb-6">
                Artesanato com Propósito
              </h2>
              <p className="text-lg text-primary-700 mb-4">
                Na Sonin, cada vela é cuidadosamente elaborada com cera 100% natural de soja e fragrâncias premium.
                Nossos óleos essenciais são puros e de origem sustentável, garantindo qualidade e bem-estar.
              </p>
              <p className="text-lg text-primary-700 mb-6">
                Acreditamos no poder das fragrâncias para transformar ambientes e criar momentos memoráveis.
                Cada produto é uma experiência sensorial única.
              </p>
              <Link
                href="/sobre"
                className="inline-block text-accent-600 font-semibold hover:text-accent-700 transition-colors"
              >
                Conheça Nossa História →
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80"
                alt="Sobre Sonin"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-primary-700 max-w-2xl mx-auto">
              Descubra nossa seleção cuidadosamente escolhida de velas aromáticas e óleos essenciais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/produtos"
              className="inline-block bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-900 transition-colors"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 bg-accent-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">100% Natural</h3>
              <p className="text-primary-700">
                Ingredientes naturais e sustentáveis, livres de toxinas e produtos químicos nocivos
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-accent-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Artesanal</h3>
              <p className="text-primary-700">
                Cada produto é feito à mão com atenção aos mínimos detalhes
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-accent-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Entrega Rápida</h3>
              <p className="text-primary-700">
                Envio seguro e rápido para todo o Brasil
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Transforme Seu Espaço
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Inscreva-se para receber ofertas exclusivas e dicas de bem-estar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="px-6 py-3 rounded-lg text-primary-900 flex-1"
            />
            <button className="bg-white text-primary-900 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
