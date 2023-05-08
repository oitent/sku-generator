import { useState } from 'react';
import parametersData from '../parameters.json';

const generateSKUCombinations = (selectedParameters) => {
  const parameterKeys = Object.keys(selectedParameters);
  const combinations = [];

  function generateCombo(prefix, currentIndex) {
    if (currentIndex === parameterKeys.length) {
      combinations.push(prefix);
      return;
    }

    const currentParameter = parameterKeys[currentIndex];
    const currentValues = selectedParameters[currentParameter];

    for (const value of currentValues) {
      generateCombo(prefix + value, currentIndex + 1);
    }
  }

  generateCombo('', 0);
  return combinations;
};

const IndexPage = () => {
  const [selectedParameters, setSelectedParameters] = useState({});
  const [skuList, setSkuList] = useState([]);

  const handleChange = (e, parameter, value) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedParameters({
        ...selectedParameters,
        [parameter]: [...(selectedParameters[parameter] || []), value],
      });
    } else {
      setSelectedParameters({
        ...selectedParameters,
        [parameter]: selectedParameters[parameter].filter((v) => v !== value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinations = generateSKUCombinations(selectedParameters);
    setSkuList([...skuList, ...combinations]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">SKU Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col w-full">
        <ol className='flex flex-row gap-4'>
          {Object.keys(parametersData).map((parameter) => (
            <li key={parameter} className='flex flex-col'>
              <p className="text-lg font-semibold mb-2">{parameter}:</p>
              {parametersData[parameter].map((option) => (
                <label
                  key={option.id}
                  className="inline-flex items-center space-x-1 mr-4 mb-2"
                >
                  <input
                    type="checkbox"
                    value={option.id}
                    onChange={(e) => handleChange(e, parameter, option.id)}
                    className="rounded-md border-gray-300"
                  />
                  <span>{option.value}</span>
                </label>
              ))}
            </li>
          ))}</ol>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4"
          >
            Generate SKUs
          </button></div>
      </form>
      <h2 className="text-2xl font-bold mt-8 mb-4">Generated SKUs</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">SKU</th>
          </tr>
        </thead>
        <tbody>
          {skuList.map((sku, index) => (
            <tr key={index} className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{sku}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexPage;
