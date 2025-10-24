-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24/10/2025 às 13:35
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `banco_animosidade`
--
CREATE DATABASE IF NOT EXISTS `banco_animosidade` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `banco_animosidade`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atualizacoes`
--

CREATE TABLE `atualizacoes` (
  `id` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `versao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `atualizacoes`
--

INSERT INTO `atualizacoes` (`id`, `titulo`, `descricao`, `versao`) VALUES
(4, 'atualização teste', 'testando', '1'),
(5, 'teste2', 'testa', '12');

-- --------------------------------------------------------

--
-- Estrutura para tabela `download`
--

CREATE TABLE `download` (
  `jogo` varchar(255) DEFAULT NULL,
  `instalacoes` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `download`
--

INSERT INTO `download` (`jogo`, `instalacoes`) VALUES
('https://youtu.be/Kno4SI3T9vs?si=CXDXFemoJ2UI_WEz', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `feedback`
--

CREATE TABLE `feedback` (
  `mensagem` varchar(255) DEFAULT NULL,
  `versao` varchar(10) NOT NULL,
  `estrelas` int(10) NOT NULL,
  `id_usuario` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `feedback`
--

INSERT INTO `feedback` (`mensagem`, `versao`, `estrelas`, `id_usuario`) VALUES
('gostei bastante!!!', '1.1', 5, NULL),
('gostei bastante!!!', '1.1', 5, NULL),
('uhuuuuuuuuuuuu!!', '1.1', 5, NULL);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `adm` tinyint(1) DEFAULT 0,
  `nome` varchar(255) NOT NULL,
  `foto` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `senha`, `adm`, `nome`, `foto`) VALUES
(30, 'kauanvenanciobarata@gmail.com', NULL, 0, 'Kauan_935', 0x2f75706c6f6164732f313736303635343233333631352d3236313336373933302e706e67),
(31, 'kauanvenancio@dev.com', '$2b$10$leadyLKTDllrc9BcmCF/kezClVWi9TnlVZkQD9/CpATsPcwLrbm7K', 1, 'Kauan', NULL),
(32, 'kauan@gmail.com', '$2b$10$5RU1jMRdUFoC9X6yu6K63uVAz764xjbQeJTtn/oGDCtLg0R.vmHma', 0, 'Kauan Public', NULL),
(33, 'joaomorangoni@dev.com', '$2b$10$JV49SUSTqYILwkSe4k4qK.49/C0F7LgCxvUKiMJ3iC3xIsG.n73Oy', 1, 'João Moranguinho', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `atualizacoes`
--
ALTER TABLE `atualizacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `feedback`
--
ALTER TABLE `feedback`
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `atualizacoes`
--
ALTER TABLE `atualizacoes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
