import React, { useRef } from 'react';
import './objetivos.css';
import { Target, Star, Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

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
            <GoalCard key={index} goal={goal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GoalCard({ goal, index }) {
  const ref = useRef(null);
  // Sem once:true para detectar múltiplas entradas/saídas
  const isInView = useInView(ref, { amount: 0.3, once: false });

  // Variantes para entrada (fade + slide up) e saída (fade + slide down)
  const variants = {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut", 
        delay: index * 0.3, // delay crescente na entrada
      } 
    },
    hidden: { 
      opacity: 0, 
      y: 20, 
      transition: { 
        duration: 0.8, 
        ease: "easeIn", 
        delay: (goals.length - 1 - index) * 0.3, // delay invertido na saída para manter ordem
      } 
    }
  };

  return (
    <motion.div
      className="goal-card"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {goal.icon}
      <h3 className="goal-title">{goal.title}</h3>
      <p className="goal-description">{goal.description}</p>
    </motion.div>
  );
}
