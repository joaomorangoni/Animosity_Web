import React from "react";
import NavbarDev from "../components/dev/NavbarDev";
import BannerDev from "../components/dev/BannerDev";

// Importando gráficos do Recharts
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// Importando ícones do Lucide React
import { Heart } from "lucide-react";

// Importando CSS específico da página
import "./pagedev.css";

// Dados de exemplo para os gráficos
const data = [
  { name: "Jan", boas: 40, ruins: 10 },
  { name: "Fev", boas: 30, ruins: 15 },
  { name: "Mar", boas: 50, ruins: 20 },
  { name: "Abr", boas: 70, ruins: 25 }
];

export default function PageDev() {
  return (
    <div className="page-dev-container">
      {/* Navbar fixa */}
      <NavbarDev />

      {/* Banner com logo e título */}
      <BannerDev />

      {/* Seção principal */}
      <section className="content-dev">
        <h2>Análise de Feedbacks</h2>
        <p>Veja como os usuários avaliaram nosso sistema:</p>

        {/* Gráfico responsivo */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="boas" fill="#82ca9d" name="Avaliações Boas" />
              <Bar dataKey="ruins" fill="#ff6b6b" name="Avaliações Ruins" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Exemplo de interação */}
        <div className="interaction-section">
          <Heart size={24} color="#a259ff" />
          <span>Obrigado por apoiar nosso projeto!</span>
        </div>
      </section>
    </div>
  );
}
