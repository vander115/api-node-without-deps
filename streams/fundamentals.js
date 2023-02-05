import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;

    if (i > 100) {
      this.push(null);
    } else {
      const buf = Buffer.from(String(i));
      this.push(buf);
    }
  }
}

class InvertNumberStream extends Transform {
  // Tranform -> tranforma os dados (chunks) em outros dados (chunks)

  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
    // callback -> (param1 - descrição de um possível erro / param 2 - valor tranformado)
  }
}

class MutiplyByTenStream extends Writable {
  // chuck -> Pedaço da Informação
  // enconding -> Como essa informação está codificada
  // callback -> () => {} - Deve ser chamanda ao terminar a ação com a informação

  // Write não tem retorno, pois ela apenas processa os dados e não os transforma!

  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream()
  .pipe(new InvertNumberStream())
  .pipe(new MutiplyByTenStream());
