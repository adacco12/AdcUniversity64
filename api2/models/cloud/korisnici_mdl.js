const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let korisniciSchema = new Schema({
  _id: { type: String },
  Counter: { type: Number },
  SifraFirme: { type: String },
  Idb: { type: Number },
  Red_br: { type: Number },
  Demo: { type: Number },
  SrbHrv: { type: Number },
  Prefiks: { type: String },
  LoginID: { type: String },
  Password: { type: String },
  Ime: { type: String },
  Prezime: { type: String },
  Email: { type: String },
  Firma: { type: String },
  DatumPrijave: { type: String },
  DatumIsteka: { type: String },
  Code: { type: String },
  RPrefiks: { type: String },
  DatumZadnjeUplate: { type: String },
  BrojDana: { type: Number },
  FIN: { type: Number },
  ROB: { type: Number },
  MLP: { type: Number },
  MAT: { type: Number },
  PROIZ: { type: Number },
  PLA: { type: Number },
  OSNSR: { type: Number },
  SZR: { type: Number },
  BLAG: { type: Number },
  PUTN: { type: Number },
  KAM: { type: Number },
  VIRM: { type: Number },
  KONTR: { type: Number },
  HON: { type: Number },
  BrojKrsnk: { type: Number },
  MaxBrFirmi: { type: Number },
  MaxProstor: { type: Number },
  SQLPocDatum: { type: String },
  SQLPocDat: { type: String },
  DatumZadnjegUlaska: { type: String },
  TProstor: { type: Number },
  DatumZadnjegUlaskaDate: { type: String }
}, {
  collection: 'Korisnici'
});


module.exports = mongoose.model('mdlKorisnici', korisniciSchema);

