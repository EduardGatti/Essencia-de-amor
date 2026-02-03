import Header from '../../Components/Header/Header'
import './PaginaPrincipal.css'
import { useState } from 'react'
import { FaWhatsapp, FaShoppingCart } from 'react-icons/fa'

function PaginaPrincipal() {
  const [termoPesquisa, setTermoPesquisa] = useState('')
  
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
    { id: 13, imagem: 'image13.png', titulo: 'Refil de Difusor 240ml', preco: 'R$ 60,00', categoria: 'refil' },
    { id: 14, imagem: 'image14.png', titulo: 'Mine Home Spray', preco: 'R$ 10,00', categoria: 'spray' },
    { id: 15, imagem: 'image15.png', titulo: 'Home Spray', preco: 'R$ 75,00', categoria: 'spray' }
  ]

  const gerarMensagemWhatsApp = (produtoTitulo) => {
    const mensagem = `Olá! Gostaria de fazer um pedido do produto:

*${produtoTitulo}*

Poderia me informar sobre a disponibilidade e formas de pagamento?
Aguardo seu retorno! 😊`;
    
    return encodeURIComponent(mensagem);
  }

  // Função para abrir WhatsApp
  const abrirWhatsApp = (produtoTitulo) => {
    const numero = '554888179143'; 
    const mensagem = gerarMensagemWhatsApp(produtoTitulo);
    const url = `https://wa.me/${numero}?text=${mensagem}`;
    window.open(url, '_blank');
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
                onClick={() => abrirWhatsApp(produto.titulo)}
              >
                <FaWhatsapp className="whatsapp-icon" />
                <FaShoppingCart className="cart-icon" />
                <span>Fazer Pedido</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaginaPrincipal