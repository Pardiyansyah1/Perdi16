// ================================
// ADMIN LOGIN DATA
// ================================
const adminEmail = "admin@tiket.com";
const adminPassword = "admin123";

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    // -------------------------------
    // REGISTRASI
    // -------------------------------
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nama = document.getElementById("nama").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                alert("Email dan password wajib diisi!");
                return;
            }

            localStorage.setItem("userNama", nama);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            alert("Registrasi berhasil! Silakan login.");
            window.location.href = "login.html";
        });
    }

    // -------------------------------
    // LOGIN
    // -------------------------------
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (email === adminEmail && password === adminPassword) {
                alert("Login sebagai ADMIN berhasil!");
                window.location.href = "admin.html";
            } else if (
                email === localStorage.getItem("userEmail") &&
                password === localStorage.getItem("userPassword")
            ) {
                alert("Login pengguna berhasil!");
                window.location.href = "index.html";
            } else {
                alert("Email atau password salah!");
            }
        });
    }

    // -------------------------------
    // FORM PEMESANAN TIKET
    // -------------------------------
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nama = document.getElementById("namaBooking").value;
            const asal = document.getElementById("asal").value;
            const tujuan = document.getElementById("tujuan").value;
            const tanggal = document.getElementById("tanggal").value;

            const dataBaru = { nama, asal, tujuan, tanggal };
            const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
            bookings.push(dataBaru);
            localStorage.setItem("bookings", JSON.stringify(bookings));

            alert("Pemesanan berhasil disimpan!");
            bookingForm.reset();
        });
    }

    // -------------------------------
    // ADMIN DATA
    // -------------------------------
    if (window.location.pathname.includes("admin.html")) {
        tampilkanDataPengguna();
        tampilkanDataPemesanan();
    }
});

// ================================
// LOGOUT
// ================================
function logout() {
    alert("Anda telah logout!");
    window.location.href = "login.html";
}

// ================================
// ADMIN - DATA PENGGUNA
// ================================
function tampilkanDataPengguna() {
    const userTableBody = document.querySelector("#userTable tbody");
    if (!userTableBody) return;
    userTableBody.innerHTML = "";

    const nama = localStorage.getItem("userNama");
    const email = localStorage.getItem("userEmail");
    const password = localStorage.getItem("userPassword");

    if (email) {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${nama}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td><button onclick="hapusPengguna()">Hapus</button></td>
        `;
        userTableBody.appendChild(tr);
    } else {
        userTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Belum ada pengguna terdaftar.</td></tr>`;
    }
}

function hapusPengguna() {
    if (confirm("Yakin ingin menghapus data pengguna ini?")) {
        localStorage.removeItem("userNama");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPassword");
        tampilkanDataPengguna();
        alert("Data pengguna telah dihapus!");
    }
}

// ================================
// ADMIN - DATA PEMESANAN
// ================================
function tampilkanDataPemesanan() {
    const bookingTableBody = document.querySelector("#bookingTable tbody");
    if (!bookingTableBody) return;
    bookingTableBody.innerHTML = "";

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    if (bookings.length === 0) {
        bookingTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Belum ada data pemesanan.</td></tr>`;
        return;
    }

    bookings.forEach((data, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${data.nama}</td>
            <td>${data.asal}</td>
            <td>${data.tujuan}</td>
            <td>${data.tanggal}</td>
            <td><button onclick="hapusPemesanan(${index})">Hapus</button></td>
        `;
        bookingTableBody.appendChild(tr);
    });
}

function hapusPemesanan(index) {
    if (confirm("Hapus data pemesanan ini?")) {
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.splice(index, 1);
        localStorage.setItem("bookings", JSON.stringify(bookings));
        tampilkanDataPemesanan();
        alert("Data pemesanan berhasil dihapus!");
    }
}