
// ==========================================
// PPAW WEEK 6
// JavaScript DOM, Event Handling, Fetch API
// ==========================================


// ==========================================
// 1. FETCH API - DATA PRODUK
// ==========================================

// Mengambil elemen HTML menggunakan DOM
const btnProduk = document.getElementById("btnProduk");
const daftarProduk = document.getElementById("daftarProduk");
const statusProduk = document.getElementById("statusProduk");

// Event listener ketika tombol diklik
btnProduk.addEventListener("click", async function () {

    // Mengosongkan daftar produk sebelumnya
    daftarProduk.innerHTML = "";

    // Menampilkan loading
    statusProduk.textContent = "Loading data produk...";
    statusProduk.className = "";

    // Menonaktifkan tombol selama loading
    btnProduk.disabled = true;

    try {
        // Mengambil data dari API DummyJSON
        const response = await fetch(
            "https://dummyjson.com/products"
        );

        // Memeriksa response API
        if (!response.ok) {
            throw new Error("Gagal mengambil data produk");
        }

        // Mengubah response JSON menjadi objek JavaScript
        const data = await response.json();

        // Menampilkan setiap produk menggunakan DOM
        data.products.forEach(function (produk) {

            // Membuat elemen card produk
            const card = document.createElement("div");
            card.className = "produk";

            // Membuat elemen nama produk
            const nama = document.createElement("h3");
            nama.textContent = produk.title;

            // Membuat elemen harga produk
            const harga = document.createElement("p");
            harga.textContent = "Harga: $" + produk.price;

            // Memasukkan nama dan harga ke card
            card.appendChild(nama);
            card.appendChild(harga);

            // Menampilkan card ke halaman web
            daftarProduk.appendChild(card);
        });

        // Pesan jika data berhasil dimuat
        statusProduk.textContent =
            "Data produk berhasil dimuat!";

        statusProduk.className = "sukses";

    } catch (error) {

        // Menampilkan pesan jika terjadi error
        statusProduk.textContent =
            "Terjadi kesalahan: " + error.message;

        statusProduk.className = "error";

    } finally {

        // Mengaktifkan kembali tombol
        btnProduk.disabled = false;
    }
});


// ==========================================
// 2. FORM - DOM & EVENT HANDLING
// ==========================================

// Mengambil elemen form dan hasil
const form = document.getElementById("formPendaftaran");
const hasilForm = document.getElementById("hasilForm");

// Event listener ketika form disubmit
form.addEventListener("submit", function (event) {

    // Mencegah halaman reload
    event.preventDefault();

    // Mengambil nilai input menggunakan DOM
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const umurInput = document.getElementById("umur").value.trim();
    const umur = Number(umurInput);

    // Menghapus hasil sebelumnya
    hasilForm.replaceChildren();

    // ======================================
    // VALIDASI INPUT
    // ======================================

    // Validasi input kosong
    if (nama === "" || email === "" || umurInput === "") {

        hasilForm.textContent =
            "Semua kolom wajib diisi!";

        hasilForm.className = "error";
        return;
    }

    // Validasi format email
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!polaEmail.test(email)) {

        hasilForm.textContent =
            "Format email tidak valid!";

        hasilForm.className = "error";
        return;
    }

    // Validasi umur
    if (!Number.isInteger(umur) || umur <= 0) {

        hasilForm.textContent =
            "Masukkan umur yang valid!";

        hasilForm.className = "error";
        return;
    }

    // ======================================
    // MENAMPILKAN HASIL FORM DENGAN DOM
    // ======================================

    // Membuat judul hasil
    const judul = document.createElement("h3");
    judul.textContent = "Pendaftaran Berhasil!";

    // Membuat elemen nama
    const infoNama = document.createElement("p");
    infoNama.textContent = "Nama: " + nama;

    // Membuat elemen email
    const infoEmail = document.createElement("p");
    infoEmail.textContent = "Email: " + email;

    // Membuat elemen umur
    const infoUmur = document.createElement("p");
    infoUmur.textContent = "Umur: " + umur + " tahun";

    // Menampilkan hasil ke halaman web
    hasilForm.append(
        judul,
        infoNama,
        infoEmail,
        infoUmur
    );

    // Memberikan warna hijau pada hasil
    hasilForm.className = "sukses";

    // Mengosongkan form setelah berhasil
    form.reset();
});
