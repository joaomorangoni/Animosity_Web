import React, { useRef } from 'react';
import './objetivos.css';
import { Target, Star, Users } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const goals = [
  {
    icon: <Target className="goal-icon" />,
    title: "O que vamos alcançar?",
    description: "O projeto tem como objetivo principal desenvolver um jogo voltado para a conscientização da ansiedade, suas causas e consequências",
  },
  {
    icon: <Users className="goal-icon" />,
    title: "Valorizar Pessoas",
    description: "Vamos valorizar a comunidade e suas opiniões, para a melhoria de mecanicas, e métodos para ajudar sempre!",
  },
  {
    icon: <Star className="goal-icon" />,
    title: "Inovar com Propósito",
    description: "Além de informar, o jogo busca incentivar o autocuidado e a importância de procurar ajuda de profissionais especializados na area da saúde mental.",
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

        {/* Título + texto abaixo dos cards */}
     
      </div>
    </section>
  );
}

function GoalCard({ goal, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });

  const variants = {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut", 
        delay: index * 0.3,
      } 
    },
    hidden: { 
      opacity: 0, 
      y: 20, 
      transition: { 
        duration: 0.8, 
        ease: "easeIn", 
        delay: (goals.length - 1 - index) * 0.3,
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
