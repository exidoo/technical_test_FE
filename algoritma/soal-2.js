function cariKalimatTerpanjang(string) {
  const kalimat = string.split(' ');
  let kalimatPalingPanjang = '';

  for (const huruf of kalimat) {
    if (huruf.length > kalimatPalingPanjang.length) {
      kalimatPalingPanjang = huruf;
    }
  }

  return kalimatPalingPanjang;
}

const contohKalimat = 'yang lain mah yang lain hehehehe';
const kataPalingPanjang = cariKalimatTerpanjang(contohKalimat);
console.log(kataPalingPanjang);
