-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16-Out-2025 às 13:50
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 7.4.29

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
-- Estrutura da tabela `atualizacoes`
--

CREATE TABLE `atualizacoes` (
  `id` int(10) UNSIGNED NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `versao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `download`
--

CREATE TABLE `download` (
  `jogo` varchar(255) DEFAULT NULL,
  `instalacoes` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `download`
--

INSERT INTO `download` (`jogo`, `instalacoes`) VALUES
('linklegal', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `feedback`
--

CREATE TABLE `feedback` (
  `mensagem` varchar(255) DEFAULT NULL,
  `versao` varchar(10) NOT NULL,
  `estrelas` int(10) NOT NULL,
  `id_usuario` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `feedback`
--

INSERT INTO `feedback` (`mensagem`, `versao`, `estrelas`, `id_usuario`) VALUES
('gostei bastante!!!', '1.1', 5, NULL),
('gostei bastante!!!', '1.1', 5, NULL),
('uhuuuuuuuuuuuu!!', '1.1', 5, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `adm` tinyint(1) DEFAULT 0,
  `nome` varchar(255) NOT NULL,
  `foto` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `senha`, `adm`, `nome`, `foto`) VALUES
(3, 'kauan@email.com', 'batmangg', 0, 'kauan', NULL),
(4, 'kauan12@email.com', '$2b$10$scb1YoQik2rUwJcovTVyjO/A7ErckHjRLekjPEgMNTA9EhpJTa8Oq', 0, 'kauan12', NULL),
(5, '', '$2b$10$/uh5uu0XSyoshr.tlLymVe8hhKEw0hgnYHTKjSAs95HZebUaKNe0i', 0, '', NULL),
(12, 'adadad', '$2b$10$BXpqo7SJQpayPMrM5k/i8eA7oIuSsog2E3oeIHJbqncYtJu7iNddS', 0, 'qdadad', NULL),
(17, 'kauan@ggmail.com', '$2b$10$1Pm0AL8w6Cy13vYFx8IdIex10e7V1.wfOso3/umMOt9JudgJMc/Ky', 0, 'kauan venancio', NULL),
(19, 'kauan@gmail.com', '$2b$10$wQ884QjfYCAc8YO5Jxl1L.8FHKC7o/UFtZi3CPOa5yQLSzX2gS8Ou', 0, 'kauan731', NULL),
(20, 'kauan@hotmail.com', '$2b$10$vvysy9CBDY09A7ftB7uZCuCz6WObYPXYe8P4qDMsu4uXwZMTO7GDu', 0, 'kauan', NULL),
(21, 'bugabuga@gmailkkk', '$2b$10$l4Na8Ej6K7UsAH9oxXkJ6.JNQywikPxcO8xW5tCz0wOdxzK22Cb.2', 0, 'rere', NULL),
(23, 'kauan1@hotmail.com', '$2b$10$RtGFHmazopzW..KmsHMuvesz5cmkhn34d9B2ExIfaVpbPwVYhwvDe', 0, 'kauan', NULL),
(24, 'kauan12@hotmail.com', '$2b$10$hL4e34SQNXeDjbMYx8dIOuh1LxGD0U3Kz1Z5.4/By/hR7UdST7u1q', 0, 'kauan', NULL),
(25, 'joao@email.com', '$2b$10$fEPQpZ4LTBLv8O8HduIhJ..AnDhEvK9JBD8OKnqEqhBlDGNyQv7ze', 0, 'joao', NULL),
(26, 'KAUAHDD@gmail.com', '$2b$10$09qBfaS0z9vNaDGHUT9gzOFp9wKJojuSFBDh6GY699DxAxsPCvMDu', 0, '1234', NULL),
(27, 'kauanzin@gmail.com', '$2b$10$/YpAEAmpBddlS0aEin90lO0foPoMJiOEaS4fotavXuuyzVNGPe3qG', 0, 'kauan1234', NULL),
(28, 'joaogay@gmail.com', '$2b$10$HiwJSfoTA5IOkyj25Rn7pewjLEOJVpDaA5r808xkKQArbAngNaYqy', 0, 'mini megacavaleiro', 0x2f75706c6f6164732f313735393736373235363036332d32313933363730352e706e67),
(29, 'seila@gmail.com', '$2b$10$ie3V16PB5sPuj9ar.zxfa.Ghhv3S1pIFa9n9sm2H.4Y0BQpOz9.1m', 0, 'baitolas', 0x2f75706c6f6164732f313735393738343331363436352d33303031333630322e706e67),
(30, 'kauanvenanciobarata@gmail.com', NULL, 0, 'Kauan Venâncio', 0x68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f612f414367386f634953416a386e394f7566516a494d465739514754735849614b6e72545a784d543072385752546a74787a713942495574657a3d7339362d63),
(31, 'etcarvalhoe@gmail.com', NULL, 0, 'Tiago Estrada', 0x68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f612f414367386f634a3273386e745a3572465a7a7a625543744f54384874476e59444467556552347430333030324c3853747773616d51673d7339362d63);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `atualizacoes`
--
ALTER TABLE `atualizacoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `feedback`
--
ALTER TABLE `feedback`
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `atualizacoes`
--
ALTER TABLE `atualizacoes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
