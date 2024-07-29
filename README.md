# FirstCircle Backend
This Node Aapp fetches data from the API at [`https://bored-api.appbrewery.com/random`](https://bored-api.appbrewery.com/random) a specified number of times and saves the responses in JSON or CSV format, or prints them to the console.

## Installation
1. Clone Repository
2. Install Dependencies

## Usage
Run the utility with the following commands:

Download JSON:
```
node app.js -n 10 -f json
```
Download CSV:
```
node app.js -n 5 -f csv
```
Print to Console:
```
node app.js -n 15 -f console
```
