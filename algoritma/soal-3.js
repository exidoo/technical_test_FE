function hitungDataYangSama(data1, data2) {
  return data1.filter((data) => data2.includes(data)).length;
}

const dataA = [12, 'Aku Kamu', '66', 5, 9, 77];
const dataB = ['Aku Kamu', '66', 9, 11, 50];

const dataGeneral = hitungDataYangSama(dataA, dataB);
console.log(`Jumlah data yang sama : ${dataGeneral}`);
