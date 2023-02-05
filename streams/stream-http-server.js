import http from 'node:http';
import { Transform } from 'node:stream';

class InvertNumberStream extends Transform {
  // Tranform -> tranforma os dados (chunks) em outros dados (chunks)

  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
    // callback -> (param1 - descrição de um possível erro / param 2 - valor tranformado)
  }
}

//req => ReadableStream
//res => WritableStream

const server = http.createServer((req, res) => {
  return req.pipe(new InvertNumberStream()).pipe(res);
});

server.listen(3334);
