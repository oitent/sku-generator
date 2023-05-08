import { useState } from 'react';
import parametersData from '../parameters.json';

const generateSKUCombinations = (selectedParameters) => {
  const parameterOrder = ['Marca', 'Nome', 'Categoria', 'Cor', 'Subcategoria', 'Tamanho'];
  const combinations = [];

  function generateCombo(prefix, currentIndex) {
    if (currentIndex === parameterOrder.length) {
      combinations.push(prefix);
      return;
    }

    const currentParameter = parameterOrder[currentIndex];
    const currentValues = selectedParameters[currentParameter] || [];

    if (currentValues.length === 0) {
      generateCombo(prefix, currentIndex + 1);
    } else {
      for (const value of currentValues) {
        generateCombo(prefix + value, currentIndex + 1);
      }
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
    <main className='dark:bg-black bg-gray-100 min-h-screen h-full'>
      <div className="mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 dark:text-white text-black">SKU Generator</h1>
        <form onSubmit={handleSubmit} className="flex flex-row w-full justify-between items-start gap-4">
          <ul className='flex flex-row gap-4 bg-gray-200 dark:bg-gray-800 rounded-lg p-6'>

            {Object.keys(parametersData).map((parameter) => (

              <li key={parameter} className='flex flex-col' data-tooltip-target="tooltip-default">
                <p className="text-lg font-semibold mb-2 text-black dark:text-gray-200">{parameter}:</p>
                {parametersData[parameter].map((option) => (
                  <label
                    key={option.id}
                    className="inline-flex items-center space-x-1 mr-4 mb-2 text-black dark:text-gray-400"
                  >
                    <input
                      type="checkbox"
                      value={option.id}
                      onChange={(e) => handleChange(e, parameter, option.id)}
                      className="rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-300 mr-1"
                    />
                    <span>{option.value}</span>
                  </label>
                ))}
              </li>

            ))}

          </ul>
          <div className='flex flex-col w-auto flex-grow flex-wrap bg-gray-100 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-500'>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Generate SKUs
            </button>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">Generated SKUs</h2>
            <table className="w-full table-auto">
              <tbody>
                {skuList.map((sku, index) => (
                  <tr key={index} className="bg-gray-700">
                    <td className="px-4 leading-tallest text-white font-mono">{sku}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </main>
  );
};

export default IndexPage;
