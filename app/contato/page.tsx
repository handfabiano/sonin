export default function ContactPage() {
  return (
    <div className="min-h-screen bg-primary-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold text-primary-900 mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-primary-700">
              Estamos aqui para ajudar! Entre em contato conosco
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-6">
                Envie uma Mensagem
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary-200 focus:border-accent-500 focus:outline-none transition-colors"
                    placeholder="Sua mensagem..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-500 text-white py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-6">
                  Informações de Contato
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-accent-100 rounded-lg">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-primary-900 mb-1">E-mail</h3>
                      <p className="text-primary-700">contato@sonin.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-accent-100 rounded-lg">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-primary-900 mb-1">Telefone</h3>
                      <p className="text-primary-700">(11) 98765-4321</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-accent-100 rounded-lg">
                      <svg className="w-6 h-6 text-accent-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-primary-900 mb-1">Instagram</h3>
                      <a
                        href="https://www.instagram.com/soninbv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-600 hover:text-accent-700"
                      >
                        @soninbv
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary-900 mb-4">
                  Horário de Atendimento
                </h2>
                <div className="space-y-2 text-primary-700">
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábado: 9h às 13h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
