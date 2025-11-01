import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1920&q=80"
            alt="Sobre Sonin"
            fill
            className="object-cover brightness-[0.6]"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Nossa História
          </h1>
          <p className="text-xl">Paixão por bem-estar e qualidade</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-primary-700 leading-relaxed mb-6">
              A Sonin nasceu do desejo de criar produtos que transformam ambientes e promovem o bem-estar.
              Acreditamos que cada momento do dia merece ser especial, e nossas velas aromáticas e óleos
              essenciais são criados para proporcionar experiências sensoriais únicas.
            </p>
            <p className="text-lg text-primary-700 leading-relaxed mb-6">
              Cada produto é cuidadosamente elaborado à mão, utilizando apenas ingredientes naturais e
              sustentáveis. Nossas velas são feitas com cera 100% de soja, livres de toxinas, e nossos
              óleos essenciais são puros e de origem certificada.
            </p>
            <p className="text-lg text-primary-700 leading-relaxed">
              Mais do que produtos, criamos experiências que conectam você consigo mesmo e com o momento
              presente. Cada fragrância é uma jornada sensorial que transforma seu espaço em um refúgio
              de tranquilidade.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-primary-900 text-center mb-12">
            Nossos Valores
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-block p-6 bg-accent-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-primary-900 mb-3">Qualidade</h3>
              <p className="text-primary-700">
                Compromisso com excelência em cada produto, do início ao fim
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-6 bg-accent-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-primary-900 mb-3">Sustentabilidade</h3>
              <p className="text-primary-700">
                Respeito ao meio ambiente em todas as nossas práticas
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-6 bg-accent-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-primary-900 mb-3">Bem-estar</h3>
              <p className="text-primary-700">
                Promover saúde e equilíbrio através de produtos naturais
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-4xl font-bold text-primary-900 text-center mb-12">
            Nosso Processo
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1602874801007-e7b2f186c8a8?w=800&q=80"
                alt="Processo artesanal"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">1. Seleção</h3>
                <p className="text-primary-700">
                  Escolhemos cuidadosamente cada ingrediente, priorizando qualidade e sustentabilidade
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">2. Criação</h3>
                <p className="text-primary-700">
                  Cada produto é feito artesanalmente, com atenção aos mínimos detalhes
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">3. Qualidade</h3>
                <p className="text-primary-700">
                  Testamos rigorosamente para garantir a melhor experiência
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">4. Entrega</h3>
                <p className="text-primary-700">
                  Embalamos com cuidado e enviamos para transformar seu espaço
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
