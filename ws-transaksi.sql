-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 06 Nov 2019 pada 07.35
-- Versi server: 10.1.37-MariaDB
-- Versi PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ws-transaksi`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `TransaksiTiket`
--

CREATE TABLE `TransaksiTiket` (
  `idTransaksi` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `virtualAccount` varchar(20) NOT NULL,
  `idMovie` int(11) NOT NULL,
  `idSchedule` int(11) NOT NULL,
  `seat` int(11) NOT NULL,
  `creationTime` datetime NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `TransaksiTiket`
--
ALTER TABLE `TransaksiTiket`
  ADD PRIMARY KEY (`idTransaksi`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `TransaksiTiket`
--
ALTER TABLE `TransaksiTiket`
  MODIFY `idTransaksi` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
