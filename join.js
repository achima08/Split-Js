var fs = require('fs');

// Membaca isi folder split
var splitFolderPath = 'split';
var splitFiles = fs.readdirSync(splitFolderPath);

var sampleFileResult = fs.createWriteStream('result.jpg')

for (var splitFile of splitFiles) {
    var sampleFileSplit = fs.createReadStream(splitFolderPath.concat('/', splitFile));

    sampleFileSplit.on('data', function(buffer) {
        var finalBuffer = Buffer.concat([buffer]);
        sampleFileResult.write(finalBuffer);
    })
}