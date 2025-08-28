import "./cadastro.css";
import Trash from "../../assets/lixo.svg";
import { useState, useEffect } from "react";

function Cadastro() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  // Carregar usuários
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // Atualizar inputs
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Cadastrar novo usuário
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((newUser) => {
        setUsers([...users, newUser]);
        setForm({ email: "", password: "", name: "" }); // limpa form
      });
  }

  // Deletar usuário
  async function handleDelete(id) {
    fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" }).then(() =>
      setUsers(users.filter((u) => u.id !== id))
    );
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Cadastro do Usuário</h1>
          <input
            name="email"
            type="email"
            placeholder="Digite seu e-mail..."
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Sua senha..."
            value={form.password}
            onChange={handleChange}
          />
          <input
            name="name"
            type="text"
            placeholder="Seu nome..."
            value={form.name}
            onChange={handleChange}
          />
          <button type="submit">Cadastrar</button>
        </form>
        {users.map((user) => (
          <div key={user.id} className="cards">
            <div>
              <p>
                Email: <span>{user.email}</span>
              </p>
              <p>
                Senha: <span>{user.password}</span>
              </p>
              <p>
                Nome: <span>{user.name}</span>
              </p>
            </div>
            <button onClick={() => handleDelete(user.id)}>
              <img src={Trash} alt="Deletar" />
            </button>
          </div>
        ))}
      </div>
      <div className="proximo">
        <button>
          <a href="./home/home.jsx">Próximo</a>
        </button>
      </div>
    </>
  );
}

export default Cadastro;

// npx json-server --watch db.json --port 3001