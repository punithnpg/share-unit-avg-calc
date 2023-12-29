import React, { useState } from "react";
import "./App.css";

function App() {
  const [firstBuyUnits, setFirstBuyUnits] = useState(0);
  const [firstBuyPrice, setFirstBuyPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [step, setStep] = useState(0.25);
  const [rangePrice, setRangePrice] = useState(0.5);

  const [desiredAveragePrice, setDesiredAveragePrice] = useState(0);

  const [results, setResults] = useState([]);

  const calculateShare = () => {
    const resultsArray = [];
    const startPrice = parseFloat(desiredAveragePrice) - rangePrice;
    const endPrice = parseFloat(desiredAveragePrice) + rangePrice;
    for (let price = startPrice; price <= endPrice; price = price + step) {
      const totalFirstBuyCost = firstBuyUnits * firstBuyPrice;

      const additionalUnits =
        (firstBuyUnits * firstBuyPrice - firstBuyUnits * price) /
        (price - currentPrice);

      const newAveragePrice = price;
      const costSecondTime = additionalUnits * price;

      const totalCost = totalFirstBuyCost + costSecondTime;

      resultsArray.push({
        averagePrice: newAveragePrice.toFixed(2),
        unitsToBuySecondTime: parseInt(additionalUnits),
        costToBuySecondTime: costSecondTime.toFixed(2),
        totalBuyCost: totalCost.toFixed(2),
      });

      setResults(resultsArray);
    }
  };

  return (
    <div className="container">
      <h2>Avg Unit Calculator</h2>
      <div className="input-row">
        <div className="input-field">
          <label>First Buy Units:</label>
          <input
            type="number"
            value={firstBuyUnits}
            onChange={(e) => setFirstBuyUnits(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>First Buy Price:</label>
          <input
            type="number"
            value={firstBuyPrice}
            onChange={(e) => setFirstBuyPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="input-field">
          <label>Current Price:</label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>Desired Average Price:</label>
          <input
            type="number"
            value={desiredAveragePrice}
            onChange={(e) => setDesiredAveragePrice(e.target.value)}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="input-field">
          <label>Step (No of steps in average to increase):</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(parseFloat(e.target.value))}
          />
        </div>
        <div className="input-field">
          <label>
            Range Price: (How much to increase/ descrease for each step){" "}
          </label>
          <input
            type="number"
            value={rangePrice}
            onChange={(e) => setRangePrice(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <button onClick={calculateShare}>Calculate</button>
      <div>
        <h3>Results:</h3>
        <table>
          <thead>
            <tr>
              <th>Average Price</th>
              <th>No of Units to Buy</th>
              <th>Cost to Buy</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.averagePrice}</td>
                <td>{result.unitsToBuySecondTime}</td>
                <td>Rs {result.costToBuySecondTime}</td>
                <td>Rs {result.totalBuyCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
