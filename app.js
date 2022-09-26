const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./Contact');

yargs
  .command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
      nama: {
        describe: 'Nama Lengkap',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Alamat email',
        demandOption: false,
        type: 'string',
      },
      noHp: {
        describe: 'Nomor Telpon',
        demandOption: true,
        type: 'string',
      },
    },
    handler: (argv) => {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

yargs.command({
  command: 'list',
  describe: 'menampilkan semua contact ',
  handler: () => {
    listContact();
  },
});

yargs.command({
  command: 'detail',
  describe: 'menampilkan detail contact',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    detailContact(argv.nama);
  },
});

yargs.command({
  command: 'delete',
  describe: 'menghapus contact',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler: (argv) => {
    deleteContact(argv.nama);
  },
});

yargs.parse();
