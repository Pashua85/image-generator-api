/* eslint-disable prettier/prettier */
import { Injectable, Res, StreamableFile } from '@nestjs/common';
import * as jsdom from 'jsdom';
import d3ToPng from 'd3-svg-to-png';
import { join } from 'path';
import { convertFile } from 'convert-svg-to-png';
import d3n from 'd3-node';
import fs, { createReadStream } from 'fs';

const d3 = d3n.d3;

const { JSDOM } = jsdom;

@Injectable()
export class ImageGeneratorService {
  async generate(): Promise<StreamableFile | null> {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

    const body = d3.select(dom.window.document.querySelector('body'));
    const svg = body
      .append('svg')
      .attr('width', 100)
      .attr('height', 100)
      .attr('xmlns', 'http://www.w3.org/2000/svg');
    svg
      .append('rect')
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', 80)
      .attr('height', 80)
      .style('fill', 'orange');

    try {
      fs.writeFileSync(`./generated/generated.svg`, body.node().innerHTML, {
        flag: 'w',
      });

      const inputFilePath = `./generated/generated.svg`;
      const outputFilePath = await convertFile(inputFilePath);

      const file = createReadStream(join(process.cwd(), outputFilePath));

      console.log({ file });

      return new StreamableFile(file);
    } catch (err) {
      console.error({ createFileError: err });
    }

    return null;
  }
}

// const { convertFile}  = require('convert-svg-to-png');

// (async() => {
//   const inputFilePath = '/path/to/my-image.svg';
//   const outputFilePath = await convertFile(inputFilePath);

//   console.log(outputFilePath);
//   //=> "/path/to/my-image.png"
// })();

// fs.writeFile('./myfile.txt', 'Content to write', { flag: 'w' }, function (err) {
//   if (err) return console.error(err);
//   fs.readFile('./myfile.txt', 'utf-8', function (err, data) {
//     if (err) return console.error(err);
//     console.log(data);
//   });
// });
