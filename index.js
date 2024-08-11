const fs = require('fs');
const csv = require('csv-parser');
const readline = require('readline');
const pdf = require('html-pdf');

// Function to convert CSV to array
function convertCSVToArray(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

// Function to filter data by usernames
function filterByUsernames(data, usernames) {
    return data.filter(row => usernames.includes(row.username));
}

// Function to generate HTML table content
function generateHTMLTable(data) {
    if (data.length === 0) {
        return "<p>No data to display.</p>";
    }
    
    // Get headers
    const headers = ['name', 'username', 'password']; // Specific columns required
    
    // Create HTML table
    let html = `
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Gordita:wght@400;700&display=swap');

            body {
                font-family: 'Gordita', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
                color: #333;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin: 20px 0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                background-color: #ffffff;
            }
            th, td {
                border: 1px solid #dee2e6;
                padding: 12px;
                text-align: left;
            }
            th {
                background-color: #43a5a1;
                color: #ffffff;
                font-weight: bold;
            }
            tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            tr:hover {
                background-color: #f1f1f1;
            }
            h1 {
                text-align: center;
                color: #43a5a1;
                font-size: 24px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <h1>NordPass Data Export</h1>
        <table>
            <thead>
                <tr>`;
    
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += `</tr></thead><tbody>`;
    
    data.forEach(row => {
        html += '<tr>';
        headers.forEach(header => {
            html += `<td>${row[header] || ''}</td>`; // Use an empty string if the value is undefined
        });
        html += '</tr>';
    });
    html += '</tbody></table></body></html>';
    
    return html;
}

// Function to generate PDF file
function generatePDF(html, outputFilePath) {
    return new Promise((resolve, reject) => {
        pdf.create(html).toFile(outputFilePath, (err, res) => {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

// Function to generate HTML file
function generateHTMLFile(html, outputFilePath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(outputFilePath, html, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

// Main function
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Ask for the CSV file path
    rl.question('Enter the path of the CSV file: ', async (filePath) => {
        // Ask for the first username to filter
        let usernames = [];
        
        async function askForUsername() {
            return new Promise((resolve) => {
                rl.question('Enter a username to filter (leave empty to finish): ', (username) => {
                    if (username) {
                        usernames.push(username);
                        askForUsername().then(resolve);
                    } else {
                        resolve();
                    }
                });
            });
        }

        await askForUsername();

        // Ask if the user wants to filter additional usernames
        rl.question('Filter more usernames? (y/N) ', async (response) => {
            if (response.toLowerCase() === 'y') {
                await askForUsername();
            }

            try {
                const data = await convertCSVToArray(filePath);
                const filteredData = filterByUsernames(data, usernames);

                // Generate HTML content
                const html = generateHTMLTable(filteredData);

                // Define output file paths
                const htmlFilePath = 'output.html';
                const pdfFilePath = 'output.pdf';

                // Generate HTML and PDF files
                await generateHTMLFile(html, htmlFilePath);
                await generatePDF(html, pdfFilePath);

                console.log(`HTML and PDF files have been successfully created:
                - ${htmlFilePath}
                - ${pdfFilePath}`);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                rl.close();
            }
        });
    });
}

main();
