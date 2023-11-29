const input = require("prompt-sync")();

class Mahasiswa {
  static nim = 2102020105;
  static daftarNim = [];
  static daftarMahasiswa = [];

  #nim;
  #nama;
  #kelas;
  #prodi;
  #alamat;
  #telp;
  constructor(nama, kelas, prodi, alamat, telp) {
    this.#nim = this.#generateNim();
    this.#nama = nama;
    this.#kelas = kelas;
    this.#prodi = prodi;
    this.#alamat = alamat;
    this.#telp = telp;
  }

  static validasiInput(nama, kelas, prodi, alamat, telp) {
    if (!(telp.startsWith("62") || telp.startsWith("+62"))) {
      return false;
    }
    telp = telp.replace("+", "");
    if (Array.from(telp).some((number) => isNaN(number))) {
      return false;
    }

    if (
      nama.length === 0 ||
      kelas.length === 0 ||
      prodi.length === 0 ||
      alamat.length === 0
    ) {
      return false;
    }

    if (
      Array.from(nama).some((abjad) => isFinite(abjad)) ||
      Array.from(prodi).some((abjad) => isFinite(abjad))
    ) {
      return false;
    }
    return true;
  }

  static panduanData() {
    console.clear();
    console.log(`
    ===========================================================
   |                     Selamat Datang di                     |
   |                Universitas Wibu Indonesia                 |
   |===========================================================|
   |   Panduan pengisian data :                                |
   |                                                           |
   |   1. Nama,kelas,prodi,telp dan                            |                            
   |      alamat tidak boleh kosong                            |
   |                                                           |
   |   2. Nama dan prodi tidak boleh                           |
   |      mengandung angka                                     |
   |                                                           |
   |   3. Untuk saat ini no telp                               |
   |      harus diawali dengan (+62)                           |
   |      atau (62)                                            |
   |                                                           |
   |   4. No telp tidak boleh                                  |
   |      mengandung abjad                                     |
   |                                                           |
   | Setelah membaca panduan ini, anda diharapkan mengerti     |
   | cara mengisi data pada program ini.                       |
    ===========================================================
  `);
    input("Press enter...");
  }

  static inputData() {
    let nama = input("Masukkan nama: ");
    let kelas = input("Masukkan kelas: ");
    let prodi = input("Masukkan prodi: ");
    let telp = input("Masukkan telp (+62): ");
    let alamat = input("Masukkan alamat: ");
    if (Mahasiswa.validasiInput(nama, kelas, prodi, alamat, telp)) {
      telp = telp.replace("+62", "0").replace("62", "0");
      return [nama, kelas, prodi, telp, alamat];
    }
  }

  static tambahMahasiswa() {
    try {
      const [nama, kelas, prodi, telp, alamat] = Mahasiswa.inputData();
      const mahasiswa = new Mahasiswa(nama, kelas, prodi, alamat, telp);
      if (mahasiswa) {
        Mahasiswa.daftarMahasiswa.push(mahasiswa.dataConstructor);
        console.log("Data berhasil ditambahkan !");
        input("Press enter...");
      }
    } catch {
      console.log("Format data tidak valid");
      let panduan = input(
        "\nData gagal ditambahkan !\nPastikan anda mengisi data dengan benar,\napakah anda ingin melihat panduan isi data ? [y/n]: "
      ).toLowerCase();
      if (panduan === "y") {
        Mahasiswa.panduanData();
      }
    }
  }

  static lihatMahasiswa() {
    console.clear();
    console.log(`
 ${"=".repeat(101)}
|${"Selamat datang di".padStart((101 - 17) / 2 + 17, " ").padEnd(101, " ")}|
|${"Universitas Wibu Indonesia"
      .padStart((101 - 26) / 2 + 26, " ")
      .padEnd(101, " ")}|
|${"=".repeat(101)}|`);
    console.log(
      `|${"Nim".padStart((12 - 3) / 2 + 3, " ").padEnd(12, " ")}|${"Nama"
        .padStart((30 - 4) / 2 + 4, " ")
        .padEnd(30, " ")}|${"Kelas"
        .padStart((8 - 5) / 2 + 5, " ")
        .padEnd(8, " ")}|${"Prodi"
        .padStart((16 - 5) / 2 + 5, " ")
        .padEnd(16, " ")}|${"Telp"
        .padStart((14 - 4) / 2 + 4, " ")
        .padEnd(14, " ")}|${"Alamat"
        .padStart((16 - 6) / 2 + 6, " ")
        .padEnd(16, " ")}|
|${"-".repeat(12)}|${"-".repeat(30)}|${"-".repeat(8)}|${"-".repeat(
        16
      )}|${"-".repeat(14)}|${"-".repeat(16)}|`
    );
    if (Mahasiswa.daftarMahasiswa.length > 0) {
      for (const mahasiswa of Mahasiswa.daftarMahasiswa) {
        const { nim, nama, kelas, prodi, alamat, telp } = mahasiswa;
        console.log(
          `|${nim
            .padStart((12 - nim.length) / 2 + nim.length, " ")
            .padEnd(12, " ")}|${nama
            .padStart((30 - nama.length) / 2 + nama.length, " ")
            .padEnd(30, " ")}|${kelas
            .padStart((8 - kelas.length) / 2 + kelas.length, " ")
            .padEnd(8, " ")}|${prodi
            .padStart((16 - prodi.length) / 2 + prodi.length, " ")
            .padEnd(16, " ")}|${telp
            .padStart((14 - telp.length) / 2 + telp.length, " ")
            .padEnd(14, " ")}|${alamat
            .padStart((16 - alamat.length) / 2 + alamat.length, " ")
            .padEnd(16, " ")}|`
        );
      }
    }
    console.log(` ${"=".repeat(101)}`);
    input("Press enter...");
  }

  static updateMahasiswa(nimUpdate) {
    let found = false;
    Mahasiswa.daftarMahasiswa.forEach((mahasiswa) => {
      if (mahasiswa.nim === nimUpdate) {
        try {
          const [nama, kelas, prodi, telp, alamat] = Mahasiswa.inputData();
          mahasiswa.nama = nama;
          mahasiswa.kelas = kelas;
          mahasiswa.prodi = prodi;
          mahasiswa.telp = telp;
          mahasiswa.alamat = alamat;

          console.log("Data berhasil di update !");
          input("Press enter...");
        } catch {
          console.log("Format data tidak valid");
          let panduan = input(
            "\nData gagal di update !\nPastikan anda mengisi data dengan benar,\napakah anda ingin melihat panduan isi data ? [y/n]: "
          ).toLowerCase();
          if (panduan === "y") {
            Mahasiswa.panduanData();
          }
        }
        found = true;
      }
    });

    if (!found) {
      console.log("Nim tidak ditemukkan !");
      input("Press enter...");
    }
  }

  static deleteMahasiswa(nimDelete) {
    let found = false;
    Mahasiswa.daftarMahasiswa.forEach((mahasiswa, index) => {
      if (mahasiswa.nim === nimDelete) {
        Mahasiswa.daftarMahasiswa.splice(index, 1);
        console.log("Data berhasil dihapus !");
        input("Press enter...");
        found = true;
      }
    });

    if (!found) {
      console.log("Nim tidak ditemukan !");
      input("Press enter...");
    }
  }

  get dataConstructor() {
    return {
      nim: `${this.#nim}`,
      nama: this.#nama,
      kelas: this.#kelas,
      prodi: this.#prodi,
      alamat: this.#alamat,
      telp: `${this.#telp}`,
    };
  }

  #generateNim() {
    if (!Mahasiswa.daftarNim.length) {
      Mahasiswa.daftarNim.push(Mahasiswa.nim);
      return Mahasiswa.daftarNim[Mahasiswa.daftarNim.length - 1];
    }
    return ++Mahasiswa.daftarNim[Mahasiswa.daftarNim.length - 1];
  }
}

let program = true;
while (program) {
  console.clear();
  console.log(`
 ===========================================================
|                     Selamat Datang di                     |
|                Universitas Wibu Indonesia                 |
|===========================================================|
|                                                           |
|   1. Lihat  Mahasiswa                                     |
|   2. Tambah Mahasiswa                                     |
|   3. Update Mahasiswa                                     |
|   4. Delete Mahasiswa                                     |
|   5. Exit                                                 |
|                                                           |
 ===========================================================
`);
  const pilih = parseInt(input("Pilih : "));
  switch (pilih) {
    case 1:
      Mahasiswa.lihatMahasiswa();
      break;
    case 2:
      Mahasiswa.tambahMahasiswa();
      break;
    case 3:
      Mahasiswa.updateMahasiswa(input("Masukkan Nim yang akan di update : "));
      break;
    case 4:
      Mahasiswa.deleteMahasiswa(input("Masukkan Nim yang akan di delete : "));
      break;
    case 5:
      program = false;
      console.log("Bye !");
      break;
    default:
      console.log("Pilihan tidak tersedia !");
      input("Press enter...");
  }
}
