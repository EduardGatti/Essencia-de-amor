import Header from '../../Components/Header/Header'
import './PaginaPrincipal.css'
import { useState } from 'react'
import { FaWhatsapp, FaShoppingCart, FaTimes } from 'react-icons/fa'

function PaginaPrincipal() {
  const [termoPesquisa, setTermoPesquisa] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [essenciaSelecionada, setEssenciaSelecionada] = useState('')
  const [endereco, setEndereco] = useState('')

  // Lista de essências disponíveis
  const essencias = [
    'Toque Amor (Chá c/Roma)',
    'Toque Alegria (Alecrim/Baunilha)',
    'Ternura (Alecrim/Kiwi)',
    'Harmonia (Chá/Kiwi)',
    'Tranquility (Alecrim/Tranquility)',
    'Ibisco/Roma',
    'Lavanda',
    'Canela',
    'Chá Branco/Limão Siciliano',
    'Chá Vermelho (Amora/Maguinolha)'
  ]

  const produtos = [
    { id: 1, imagem: 'image1.png', titulo: 'Kit de Luxo - Pétalas Douradas', preco: 'R$ 300,00', categoria: 'kit luxo' },
    { id: 2, imagem: 'image2.png', titulo: 'Kit de Luxo - Elefante Dourado', preco: 'R$ 300,00', categoria: 'kit luxo' },
    { id: 3, imagem: 'image3.png', titulo: 'Kits personalizados', preco: 'R$ 200,00', categoria: 'kit personalizado' },
    { id: 4, imagem: 'image4.png', titulo: 'Kit de Luxo - Sala de Estar', preco: 'R$ 300,00', categoria: 'kit luxo' },
    { id: 5, imagem: 'image5.png', titulo: 'Kit de Luxo - Corações Azuis', preco: 'R$ 280,00', categoria: 'kit luxo' },
    { id: 6, imagem: 'image6.png', titulo: 'Kit de Luxo - Alma Dourada', preco: 'R$ 300,00', categoria: 'kit luxo' },
    { id: 7, imagem: 'image7.png', titulo: 'Kit Essência Gold', preco: 'R$ 180,00', categoria: 'kit' },
    { id: 8, imagem: 'image8.png', titulo: 'Kit de Luxo - Cristal', preco: 'R$ 280,00', categoria: 'kit luxo' },
    { id: 9, imagem: 'image9.png', titulo: 'Kit de Luxo - Perola Real', preco: 'R$ 280,00', categoria: 'kit luxo' },
    { id: 10, imagem: 'image10.png', titulo: 'Kit de Luxo - Toque de Neve', preco: 'R$ 300,00', categoria: 'kit luxo' },
    { id: 11, imagem: 'image11.png', titulo: 'Home Spray 100ml', preco: 'R$ 50,00', categoria: 'spray' },
    { id: 12, imagem: 'image12.png', titulo: 'Sabonete Liquido', preco: 'R$ 50,00', categoria: 'sabonete' },
    { id: 13, imagem: 'image13.jpeg', titulo: 'Refil de Difusor 240ml', preco: 'R$ 60,00', categoria: 'refil' },
    { id: 14, imagem: 'image14.png', titulo: 'Mine Home Spray', preco: 'R$ 10,00', categoria: 'spray' },
    { id: 15, imagem: 'image15.png', titulo: 'Home Spray', preco: 'R$ 75,00', categoria: 'spray' }
  ]

  // Função para verificar se o produto é um sabonete
  const isSabonete = (produto) => {
    return produto.categoria === 'sabonete' || 
           produto.titulo.toLowerCase().includes('sabonete');
  }

  // Função para abrir modal
  const abrirModalPedido = (produto) => {
    setProdutoSelecionado(produto)
    setEssenciaSelecionada('')
    setEndereco('')
    setModalAberto(true)
  }

  // Função para fechar modal
  const fecharModal = () => {
    setModalAberto(false)
    setProdutoSelecionado(null)
    setEssenciaSelecionada('')
    setEndereco('')
  }

  // Função para gerar mensagem completa
  const gerarMensagemWhatsApp = (produtoTitulo, essencia, enderecoCliente, isSaboneteProduto) => {
    let mensagem = `Olá! Gostaria de fazer um pedido do produto:

*${produtoTitulo}*

`;

    if (!isSaboneteProduto && essencia) {
      mensagem += `*Essência escolhida:* ${essencia}\n\n`;
    }

    if (enderecoCliente) {
      mensagem += `*Endereço para entrega:*\n${enderecoCliente}\n\n`;
    }

    mensagem += `Poderia me informar sobre a disponibilidade e formas de pagamento?\nAguardo seu retorno! 😊`;

    return encodeURIComponent(mensagem);
  }

  // Função para abrir WhatsApp com todas as informações
  const finalizarPedidoWhatsApp = () => {
    if (!produtoSelecionado) return

    const numero = '554888179143';
    const isSaboneteProduto = isSabonete(produtoSelecionado);
    const mensagem = gerarMensagemWhatsApp(
      produtoSelecionado.titulo,
      essenciaSelecionada,
      endereco,
      isSaboneteProduto
    );
    const url = `https://wa.me/${numero}?text=${mensagem}`;
    window.open(url, '_blank');
    fecharModal();
  }

  const produtosFiltrados = produtos.filter(produto => {
    if (!termoPesquisa.trim()) return true
    const termo = termoPesquisa.toLowerCase()
    return (
      produto.titulo.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo) ||
      produto.preco.toLowerCase().includes(termo)
    )
  })

  return (
    <div className='container'>
      <Header />
      <div className='card-principal'>
        <h1 className='text-titulo'>Sua essência de <br /> bem-estar em cada detalhe.</h1>
        <img src='imageEssencia.png' alt="Essência de bem-estar" />
      </div>
      
      <input 
        className='input-pesquisa' 
        type="search" 
        placeholder='Pesquise por nome, categoria ou preço...' 
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
      />
      
      {termoPesquisa && produtosFiltrados.length === 0 && (
        <div className="sem-resultados">
          <p>Nenhum produto encontrado para "{termoPesquisa}"</p>
          <button onClick={() => setTermoPesquisa('')}>Limpar busca</button>
        </div>
      )}
      
      <div className="container-grid">
        {produtosFiltrados.map((produto) => (
          <div className="item" key={produto.id}>
            <img src={produto.imagem} alt={produto.titulo} className='img-item' />
            <div className="produto-info">
              <div className="produto-texto">
                <h3 className="produto-titulo">{produto.titulo}</h3>
                <p className="produto-categoria">{produto.categoria}</p>
                <p className="produto-preco">{produto.preco}</p>
              </div>
              
              <button 
                className="btn-pedido"
                onClick={() => abrirModalPedido(produto)}
              >
                <FaWhatsapp className="whatsapp-icon" />
                <FaShoppingCart className="cart-icon" />
                <span>Fazer Pedido</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para selecionar essência e endereço */}
      {modalAberto && produtoSelecionado && (
        <div className="modal-overlay">
          <div className="modal-conteudo">
            <div className="modal-header">
              <h2>Finalizar Pedido</h2>
              <button className="btn-fechar-modal" onClick={fecharModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="info-produto-modal">
                <h3>{produtoSelecionado.titulo}</h3>
                <p className="produto-preco-modal">{produtoSelecionado.preco}</p>
                <p className="produto-categoria-modal">{produtoSelecionado.categoria}</p>
              </div>

              {/* Mostrar seleção de essência apenas se NÃO for sabonete */}
              {!isSabonete(produtoSelecionado) && (
                <div className="selecao-essencia">
                  <label htmlFor="essencia">Selecione uma essência:</label>
                  <div className="lista-essencias">
                    {essencias.map((essencia, index) => (
                      <div 
                        key={index}
                        className={`essencia-option ${essenciaSelecionada === essencia ? 'selecionada' : ''}`}
                        onClick={() => setEssenciaSelecionada(essencia)}
                      >
                        {essencia}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mostrar mensagem para sabonete */}
              {isSabonete(produtoSelecionado) && (
                <div className="mensagem-sabonete">
                  <p className="info-sabonete">
                    <strong>Produto com aroma único:</strong> Este sabonete possui uma fragrância especial e não requer seleção de essência.
                  </p>
                </div>
              )}

              <div className="endereco-input">
                <label htmlFor="endereco">
                  {isSabonete(produtoSelecionado) 
                    ? "Endereço para entrega:" 
                    : "Endereço para entrega:"}
                </label>
                <textarea 
                  id="endereco"
                  placeholder="Digite seu endereço completo (Rua, número, bairro, cidade, CEP)..."
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-cancelar"
                onClick={fecharModal}
              >
                Cancelar
              </button>
              <button 
                className="btn-confirmar"
                onClick={finalizarPedidoWhatsApp}
                disabled={!endereco.trim()}
              >
                <FaWhatsapp /> Enviar Pedido via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaginaPrincipal