import Header from '../../Components/Header/Header'
import './PaginaPrincipal.css'
function PaginaPrincipal() {
  return (
    <div className='container'>
        <Header />
        <div className='card-principal'>
            <h1 className='text-titulo'>Sua essência de bem-estar <br />em cada detalhe.</h1>
            <img src='imageEssencia.png'/>
        </div>
        <input className='input-pesquisa' type="search" placeholder='Pesquise...' />
        <div className="container-grid">
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
        </div>
    </div>
  )
}

export default PaginaPrincipal