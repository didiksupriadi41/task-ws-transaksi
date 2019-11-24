# WS-Transaksi

### Deskripsi web service

WS-Transaksi adalah Web service yang digunakan untuk Aplikasi
[**Engima**](https://gitlab.informatika.org/if3110-2019-02-k03-03/engima).
Web service ini diimplementasikan diatas
[**Node.js**](https://nodejs.org/) dengan protokol
[**REST**](https://www.w3.org/TR/2004/NOTE-ws-arch-20040211/#relwwwrest).

WS-Transaksi memiliki data yang terdiri dari data nasabah dan transaksi rekening
setiap bank.
Daftar data WS-Bank bisa dilihat di bagian
[**Basis data**](#basis-data-yang-digunakan)

WS-Transaksi menyediakan fungsi yang digunakan untuk semua transaksi tiket film
Engima.
Daftar fungsi WS-Bank bisa dilihat di bagian
[**Pembagian tugas**](#pembagian-tugas-setiap-anggota)

### Basis data yang digunakan

RDBMS yang digunakan adalah **MySQL**, dengan skema table berikut:

![Screenshot](https://i.imgur.com/vMLwWmm.png)

### Layanan yang disediakan

#### /add
Merupakan endpoint yang digunakan untuk menambahkan transaksi baru menggunakan `POST` request. <br>
Parameter yang diperlukan adalah 
```JSON
{
	"idUser": (int),
	"virtualAccount": (string),
	"idMovie": (int),
	"idSchedule": (int),
	"seat": (int)
}
```

#### /edit
Merupakan endpoint yang digunakan untuk melakukan edit transaksi yang mengubah status transaksi menjadi `success` atau `cancelled` menggunakn `POST` request<br>
Parameter yang diperlukan adalah
```JSON
{
	"idTransaksi" : (int),
	"waktuBayar": (datetime)
}
```

#### /rate
Merupkan endpoint yang digunakan untuk merubah status rating seorang user terhadap suatu transaksi menggunakan `POST` request<br>
Parameter yang diperlukan adalah
```JSON
{
	"idTransaksi" : (int),
	"val": (boolean)
}
```
#### /get
Merupakan endpoint yang digunakan untuk mengambil seluruh transaksi seorang pengguna dengan `GET` request<br>
```
http://34.227.112.253:3000/get?idUser=(int)
```
#### /seat
Merupakan endpoint yang digunakan untuk mengambil kursi yang di-*booking* oleh *user* pada suatu *schedule* dengan `GET` request<br>
```
http://34.227.112.253:3000/seat?idSchedule=(int)
```

### Pembagian tugas setiap anggota
|**No**|**Fungsi**|**NIM**|
|-|-|-|
|1|TheMovieDB|[13517012](#johanes)|
|1|Transaksi Fungsi tambah transaksi|[13517012](#johanes)|
|3|Transaksi Fungsi mengubah status transaksi|[13517126](#louis-cahyadi)|
|4|Transaksi Fungsi mengambil data transaksi user|[13517069](#didik-supriadi)|

### Pembagian tugas setiap anggota
|**No**|**Tugas**|**NIM**|
|-|-|-|
|1|Code reviewer (PIC)|[13517012](#johanes)|
|2|CI/CD|[13517012](#johanes)|
|3|Eksplorasi dan *setup* mesin deployment|[13517012](#johanes)|

#### URL deployment web service

URL: http://34.227.112.253:3000/

## Big thanks
* #### Johanes
* #### Didik Supriadi
* #### Louis Cahyadi
