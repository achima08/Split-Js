var fs = require('fs');

var splitFolder = 'split';
var sampleFileName = 'uji_coba_gambar.jpg';
var sampleFile = fs.createReadStream(sampleFileName);

var sizePerFile = 1 * 1024 * 1024;
var currentFileByte = 0;
var totalFileByte = 0;
var buffers = [];

var partCounter = 1;

sampleFile.on('data', function(buffer) {
    var bufferSize = buffer.byteLength;

    if (currentFileByte < sizePerFile) {
        buffers.push(buffer);
        currentFileByte = currentFileByte + bufferSize;
    } else {
        var sampleFileSplit = fs.createWriteStream(splitFolder.concat('/', sampleFileName, '.', 'part', partCounter));
        var finalBuffer = Buffer.concat(buffers);
        sampleFileSplit.write(finalBuffer);

        console.log('Per File', currentFileByte);

        partCounter = partCounter + 1;
        currentFileByte = 0;
    }
    totalFileByte += bufferSize;
});

sampleFile.on('close', function() {
    var sampleFileSplit = fs.createWriteStream(splitFolder.concat('/', sampleFileName, '.', 'part', partCounter));
    var finalBuffer = Buffer.concat(buffers);
    sampleFileSplit.write(finalBuffer);

    console.log('Per File', currentFileByte);
    console.log('Total', totalFileByte);
})