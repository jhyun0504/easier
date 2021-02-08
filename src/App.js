import { useEffect, useState } from 'react';
import csv from 'csvtojson'
import './App.css';
import Chart from './Chart';

function App() {
  const [data, setData] = useState([])
  const [headers, setHeaders] = useState([])

  useEffect(() => {
    const importCsv = async () => {
      const res = await fetch('./data.csv')
      const decoder = new TextDecoder('utf-8');

      const csvData =  await res.body.getReader().read().then(function (result) {
        return decoder.decode(result.value);
      });

      const jsonData = await csv().fromString(csvData)

      setData(jsonData)

      if (jsonData.length) {
        setHeaders(Object.keys(jsonData[0]))
      }
    }

    importCsv();
  }, [])

  return (
    <div className="App">
      <table>
        <thead>
          <th>Homes</th>
          {headers.map(header => <th key={header}>{header}</th>)}
        </thead>
        <tbody>
          {data.map((row, rowIndex) => 
            <tr key={rowIndex}>
              <td>Home {rowIndex + 1}</td>
              {headers.map(col => <td key={col}>{row[col]}</td>)}
            </tr>
          )}
        </tbody>
      </table>

      <Chart
        config={{
          padding: {
            right: 20
          },
          data: {
            json: data,
            keys: {
              value: ['Sell', 'List'],
            },
            type: 'bar'
          },
          axis: {
            y: {
              min: 0,
              padding: {
                bottom: 0
              }
            },
            x: {
              tick: {
                fit: false,
                format: function (x) { return 'Home ' + (x + 1)}
              }
            }
          }
        }}
      />
    </div>
  );
}

export default App;
