import "./Cabecalho.css";
import { Link } from "react-router-dom";

function Cabecalho(prop) {
  return (
    <div id="cabecalho">
      <div class="grid-container">
        <div class="grid-item"> <ul className="menu1">
            <li>
              <i class="fa fa-bars fa-lg"></i>
              <ul>
                <li>Página Inicial</li>
                
                <li>Enviar Notícia </li>
                <li>Sair</li>
              </ul>
            </li>
          </ul></div>

        <div class="grid-item">
         
        </div>

        <div class="grid-item">
          <div id="divBusca">
            <input type="text" id="txtBusca" placeholder="Buscar..." />
            <i class="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <div class="grid-item">
          <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
}

export default Cabecalho;
