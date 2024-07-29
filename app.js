const axios = require('axios');
const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

async function fetchData(apiUrl, numTimes) {
  const data = [];

  for (let i = 0; i < numTimes; i++) {
    try {
      const response = await axios.get(apiUrl);
      data.push(response.data);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }

  return data;
}

function saveAsJson(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 4), 'utf-8');
  console.log(`Data saved as ${filename}`);
}

function saveAsCsv(data, filename) {
  if (data.length === 0) {
    console.error('No data to save.');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [headers.join(',')]
    .concat(data.map(item => headers.map(header => JSON.stringify(item[header])).join(',')))
    .join('\n');

  fs.writeFileSync(filename, csvContent, 'utf-8');
  console.log(`Data saved as ${filename}`);
}


function printData(data) {
  data.forEach(item => {
    console.log(JSON.stringify(item, null, 4));
  });
}

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option('n', {
      alias: 'num_times',
      type: 'number',
      description: 'Number of times to call the API',
      demandOption: true
    })
    .option('f', {
      alias: 'format',
      type: 'string',
      description: 'Output format (json, csv, console)',
      choices: ['json', 'csv', 'console'],
      demandOption: true
    })
    .help()
    .argv;

  const apiUrl = 'https://bored-api.appbrewery.com/random';
  const numTimes = argv.num_times;
  const outputFormat = argv.format;


  const data = await fetchData(apiUrl, numTimes);

  if (outputFormat === 'json') {
    saveAsJson(data, 'activities.json');
  } else if (outputFormat === 'csv') {
    saveAsCsv(data, 'activities.csv');
  } else if (outputFormat === 'console') {
    printData(data);
  }
}

main().catch(err => console.error(err));
