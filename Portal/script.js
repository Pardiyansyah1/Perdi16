// SIMPAN DATA KE LOCAL STORAGE
document.getElementById("formNilai")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const matkul = document.getElementById("matkul").value;
    const nilai = document.getElementById("nilai").value;

    const dataBaru = { nama, nim, matkul, nilai };

    let data = JSON.parse(localStorage.getItem("dataNilai")) || [];
    data.push(dataBaru);
    localStorage.setItem("dataNilai", JSON.stringify(data));

    alert("Data berhasil disimpan!");
    this.reset();
});

// TAMPILKAN DATA DI TABEL
const tabelBody = document.querySelector("#tabelNilai tbody");
if (tabelBody) {
    const data = JSON.parse(localStorage.getItem("dataNilai")) || [];
    tabelBody.innerHTML = "";

    data.forEach((mhs, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${mhs.nama}</td>
                <td>${mhs.nim}</td>
                <td>${mhs.matkul}</td>
                <td>${mhs.nilai}</td>
            </tr>
        `;
        tabelBody.innerHTML += row;
    });
}
