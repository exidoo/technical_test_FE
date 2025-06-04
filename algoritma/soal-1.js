function reverseObject(str) {
  const huruf = str.replace(/[0-9]/g, '');
  const angka = str.replace(/[^0-9]/g, '');

  const reverseArray = huruf.split('').reverse().join('');

  return reverseArray + angka;
}
console.log(reverseObject('NEGIE1', '1'));
