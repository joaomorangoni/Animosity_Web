import React from 'react';
import './objetivos.css';
import { Target, Star, Users } from 'lucide-react';

const goals = [
  {
    icon: <Target className="goal-icon" />,
    title: "Alcançar Excelência",
    description: "Oferecer serviços e produtos com qualidade excepcional que superem as expectativas dos nossos clientes.",
  },
  {
    icon: <Users className="goal-icon" />,
    title: "Valorizar Pessoas",
    description: "Fomentar um ambiente de trabalho inclusivo, colaborativo e com foco no crescimento contínuo.",
  },
  {
    icon: <Star className="goal-icon" />,
    title: "Inovar com Propósito",
    description: "Investir em soluções criativas e tecnológicas que tragam impactos positivos para a sociedade.",
  },
];

export default function CompanyGoals() {
  return (
    <section className="company-goals">
      <div className="container">
        <h2 className="section-title">Nossos Objetivos</h2>
        <p className="section-subtitle">
          Conheça os pilares que guiam nossa empresa rumo ao futuro.
        </p>
        <div className="goals-grid">
          {goals.map((goal, index) => (
            <div key={index} className="goal-card">
              {goal.icon}
              <h3 className="goal-title">{goal.title}</h3>
              <p className="goal-description">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
