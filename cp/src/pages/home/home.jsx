// App.jsx
import React, { useState } from "react";
import "./home.css";

const produtos = [
  { id: 1, nome: "Uma Bolsa EcoBag", preco: 29.99 },
  { id: 2, nome: "Caneta Ecológica", preco: 9.90 },
  { id: 3, nome: "Kit de Sementes", preco: 15.50 },
  { id: 4, nome: "Copos Ecológicos", preco: 19.90 },
];

export default function Home() {
  const [cart, setCart] = useState([]);

  function addToCart(produto) {
    setCart(prev => {
      const itemExistente = prev.find(i => i.id === produto.id);
      if (itemExistente) {
        return prev.map(i =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  }

  function inc(id) {
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantidade: i.quantidade + 1 } : i));
  }

  function dec(id) {
    setCart(prev =>
      prev.flatMap(i => {
        if (i.id !== id) return i;
        const q = i.quantidade - 1;
        return q > 0 ? { ...i, quantidade: q } : [];
      })
    );
  }

  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id));
  }

  const total = cart.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div className="app">
      <header>
        <h1>Loja Eco-Trend</h1>
      </header>

      <main>
        <h2>Produtos</h2>
        <div className="produtos">
          {produtos.map(produto => (
            <div key={produto.id} className="produto-card">
              <img
                src={`https://via.placeholder.com/150?text=${produto.nome}`}
                alt={produto.nome}
              />
              <h3>{produto.nome}</h3>
              <p>R$ {produto.preco.toFixed(2)}</p>
              <button onClick={() => addToCart(produto)}>Comprar</button>
            </div>
          ))}
        </div>

        <h2>Carrinho</h2>
        {cart.length === 0 && <p>O carrinho está vazio.</p>}
        <div className="carrinho">
          {cart.map(item => (
            <div key={item.id} className="item-carrinho">
              <span>{item.nome} x {item.quantidade}</span>
              <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
              <div className="botoes-carrinho">
                <button onClick={() => dec(item.id)}>-</button>
                <button onClick={() => inc(item.id)}>+</button>
                <button onClick={() => removeItem(item.id)}>Remover</button>
              </div>
            </div>
          ))}
          {cart.length > 0 && <p className="total">Total: R$ {total.toFixed(2)}</p>}
        </div>
      </main>

      <footer>
        <p>© 2025 Minha Loja. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
