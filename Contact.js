const fs = require('fs');
const validator = require('validator');

// membuat pertanyaan

// membuat folder (jika tidak ada)

const reqFile = './contacts.json';
if (!fs.existsSync(reqFile)) {
  fs.writeFileSync(reqFile, '[]', 'utf-8');
}

const loadContact = () => {
  const file = fs.readFileSync('contacts.json', 'utf-8');
  const contacts = JSON.parse(file);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const contacts = loadContact();

  // mengecek duplikat
  const duplikat = contacts.find((contact) => contact.nama == nama);
  if (duplikat) {
    console.log('nama sudah ada');
    return false;
  }

  // mengecek email valid atau tidak
  if (email) {
    if (!validator.isEmail(email)) {
      console.log('email tidak valid');
      return false;
    }
  }

  // mengecek noHp
  if (!validator.isMobilePhone(noHp, 'id-ID')) {
    console.log('noHp tidak valid');
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('contacts.json', JSON.stringify(contacts));
  console.log(`Terima Kasih! ${nama} data anda sudah kami simpan`);
};

const listContact = () => {
  const contact = loadContact();
  console.log(`Daftar Contact : 
  `);
  contact.forEach((cont, i) => {
    console.log(`${i + 1}.${cont.nama} - ${cont.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();

  const contact = contacts.find((cont) => cont.nama.toLowerCase() === nama.toLowerCase());

  if (!contact) {
    console.log(`Maaf ${nama} tidak ditemukan, Mohon cari kembali`);
  } else {
    console.log(
      `${contact.nama}
${contact.noHp}
${contact.email}
    `
    );
  }
};

const deleteContact = (nama) => {
  const contact = loadContact();

  const newContact = contact.filter((cont) => cont.nama.toLowerCase() !== nama.toLowerCase());

  if (newContact.length == contact.length) {
    console.log(`${nama} tidak ditemukan`);
  } else {
    fs.writeFileSync('contacts.json', JSON.stringify(newContact));
    console.log(`Terima Kasih! ${nama}  sudah kami hapus`);
  }
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
