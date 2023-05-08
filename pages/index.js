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

  const handleChange = (e, parameter) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedParameters({ ...selectedParameters, [parameter]: selectedOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinations = generateSKUCombinations(selectedParameters);
    setSkuList([...skuList, ...combinations]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">SKU Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(parametersData).map((parameter) => (
          <div key={parameter} className="flex items-center space-x-2">
            <label htmlFor={parameter} className="text-lg font-semibold">
              {parameter}:
            </label>
            <select
              id={parameter}
              multiple
              onChange={(e) => handleChange(e, parameter)}
              className="rounded-md border border-gray-300 px-3 py-2"
            >
              {parametersData[parameter].map((option) => (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md mt-4"
        >
          Generate SKUs
        </button>
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
