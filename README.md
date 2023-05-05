# Simple ChatGPT Clone using KMP and Boyer-Moore String Matching Algorithms
> *Source Code* ini dibuat oleh kami, Kelompok GatauNamanya, untuk memenuhi Tugas Besar 3 Strategi Algoritma yaitu mengaplikasikan
> String Matching dan Regular Expression dalam Pembuatan ChatGPT Sederhana

## Daftar Isi
- [Author](#author)
- [Deskripsi Singkat](#deskripsi-singkat)
- [Sistematika File](#sistematika-file)
- [Requirements](#requirements)
- [Cara Mengkompilasi dan Menjalankan Program](#cara-mengkompilasi-dan-menjalankan-program)
- [Cara Mengoperasikan Program](#cara-mengoprasikan-program)

## Author
| NIM      | Nama                       | Github Profile                                            |
| -------- | ---------------------------|-----------------------------------------------------------|
| 13521108 | Michael Leon Putra Widhi   | [mikeleo03](https://github.com/mikeleo03)                 |
| 13521148 | Johanes Lee                | [Enliven26](https://github.com/Enliven26)                  |
| 13521172 | Nathan Tenka               | [Nat10k](https://github.com/Nat10k)                  |

## Deskripsi Singkat
Dalam tugas besar ini, dibangun sebuah aplikasi ChatGPT sederhana dengan mengaplikasikan pendekatan QA yang paling sederhana. Pencarian pertanyaan yang paling mirip dengan pertanyaan yang diberikan pengguna dilakukan dengan algoritma pencocokan string Knuth-Morris-Pratt (KMP) dan Boyer-Moore (BM). Regex digunakan untuk menentukan format dari pertanyaan (akan dijelaskan lebih lanjut pada bagian fitur aplikasi). Jika tidak ada satupun pertanyaan pada database yang exact match dengan pertanyaan pengguna melalui algoritma KMP ataupun BM, maka gunakan pertanyaan termirip dengan kesamaan setidaknya 90% Apabila tidak ada pertanyaan yang kemiripannya di atas 90%, maka chatbot akan memberikan maksimum 3 pilihan pertanyaan yang paling mirip untuk dipilih oleh pengguna.
Perhitungan tingkat kemiripan dibebaskan kepada anda asalkan dijelaskan di laporan, namun disarankan menggunakan salah satu dari algoritma Hamming Distance, Levenshtein Distance, ataupun Longest Common Subsequence.

## Sistematika File
```bash
.
├─── doc
├─── src
│   ├─── backend
│   │   ├─── node_modules
│   │   ├─── src
|   │   |   ├─── algorithms
|   │   |   ├─── authz
|   │   |   ├─── models
|   │   |   ├─── routes
|   │   |   ├─── Database.js
|   │   |   └─── index.js
│   │   ├─── package-lock.json
|   │   └─── package.json
│   └─── frontend
│       ├─── dist
│       ├─── node_modules
│       ├─── public
│       ├─── src
|       |   ├─── assets
|       |   ├─── components
|       |   ├─── pages
|       |   ├─── requests
|       |   ├─── App.css
|       |   ├─── App.js
|       |   ├─── index.css
|       |   └─── index.js
│       ├─── .gitignore
│       ├─── package-lock.json
│       ├─── package.json
│       ├─── postcss.config.js
│       ├─── README.md
|       └─── tailwind.config.js
├─── .gitignore
└─── README.md
```

## Requirements
- React.js (versi 18.2.0)
- Tailwind CSS (versi 3.3.1)
- express.js (versi 4.18.2)
- express-jwt (versi 8.4.1)
- mongoDB (versi 5.3.0)

## Cara Mengkompilasi dan Menjalankan Program
Lakukan *clone repository* melalui terminal dengan *command* berikut
``` bash
$ git clone https://github.com/mikeleo03/Tubes3_GatauNamanya.git
```
### Menjalankan *Frontend*
1. Lakukan pemindahan direktori ke `src` milik sisi *frontend* dengan *command* berikut
   ``` bash
    $ cd src/frontend
   ```
2. Lakukan kompilasi dan unduh beberapa modul yang diperlukan dengan menjalankan *command* berikut
   ``` bash
    $ npm install
    $ npm start
   ```
### Menjalankan *Backend*
1. Lakukan pemindahan direktori ke `src` milik sisi *backend* dengan *command* berikut
   ``` bash
    $ cd src/backend
   ```
2. Lakukan kompilasi dan unduh beberapa modul yang diperlukan dengan menjalankan *command* berikut
   ``` bash
    $ npm install
    $ npm run start-dev
   ```

## Cara Mengoprasikan Program
1. *Login* ke *website* dengan akun Auth0 atau gunakan autentikasi Google. Jika proses *login* berhasil, maka pengguna akan dihadapkan pada layar utama program.
2. Pilih algoritma pencarian yang diinginkan pada bagian bawah kanan aplikasi.
3. Ketikkan pertanyaan pada kolom masukan yang tersedia dan tunggu beberapa saat hingga Anda memperoleh jawaban dari *chatbot*
4. Untuk menambahkan *chat* baru, tekan tombol ```New Chat +``` di sebelah kanan atas.
5. Untuk menghapus *chat*, tekan tombol tempat sampah di sebelah kanan chat yang ingin dihapus.
6. Untuk memberi nama sebuah halaman *chat*, tekan kolom nama yang tersedia di sebelah kanan atas.
