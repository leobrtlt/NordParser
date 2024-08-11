
# NordParser

A Node.js script that parses CSV files from NordPass, filters data based on usernames, and generates styled HTML and PDF reports.


## Features

- **CSV Parsing**: Converts CSV files into a structured data format.
- **Data Filtering**: Filters data by usernames.
- **Styled Reports**: Generates visually styled HTML and PDF reports.



## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js 21 (NPM 10) installed on your system.


### Setup

1. **Clone the Repository**
```bash
  git clone https://github.com/yourusername/NordParser.git
```

2. **Navigate to the project directory**
```bash
  cd NordParser
```

3. **Install all dependencies**
```bash
  npm install
```

## Run Locally

#### 1. Run the script

```bash
  npm start
```
or 
```bash
  node index.js
```
#### 2. Follow the prompts 
    a. Enter the path to your CSV file.
    b. Provide usernames to filter by. You can enter multiple usernames and add more if needed.

#### 3. Check the Output

There are two differents file exported by the script:

**HTML File:** output.html

**PDF File:** output.pdf
## Usage/Examples

```bash
- SCRIPT STARTED -
Enter the path of the CSV file: data.csv
Enter a username to filter (leave empty to finish): user1
Enter a username to filter (leave empty to finish): user1@gmail.com
Filter more usernames? (Y/n): n

HTML and PDF files have been successfully created:
                - output.html
                - output.pdf
```

## Documentation

* [readline](https://www.npmjs.com/package/readline)
* [csv-parser](https://www.npmjs.com/package/csv-parser)
* [html-pdf](https://github.com/marcbachmann/node-html-pdf)
* [fs](https://nodejs.org/api/fs.html)


## Contributing

Contributions are welcome! Please submit **issues**, **fork the repository**, and send **pull requests**.


## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License. See the LICENSE file for details.

