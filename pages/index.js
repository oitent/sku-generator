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
  const [searchTerms, setSearchTerms] = useState({});

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

  const handleSearch = (e, parameter) => {
    setSearchTerms({
      ...searchTerms,
      [parameter]: e.target.value,
    });
  };

  const filteredOptions = (parameter) => {
    const searchTerm = searchTerms[parameter]?.toLowerCase() || '';
    return parametersData[parameter]
      .filter((option) =>
        option.value.toLowerCase().includes(searchTerm)
      )
      .sort((a, b) => {
        if (a.value === 'NÃO TEM') return -1;
        if (b.value === 'NÃO TEM') return 1;
        return a.value.localeCompare(b.value);
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const combinations = generateSKUCombinations(selectedParameters);
    setSkuList([...skuList, ...combinations]);
  };

  return (
    <main className='dark:bg-black bg-gray-100 min-h-screen'>
      <div className="mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4 dark:text-white text-black">SKU Generator</h1>
        <form onSubmit={handleSubmit} className="flex flex-row w-full justify-between items-start gap-4">

          <ul className="flex flex-row gap-4 bg-gray-200 dark:bg-gray-800 rounded-lg p-6">
            {Object.keys(parametersData).map((parameter) => (
              <li
                key={parameter}
                className="flex flex-col"
                data-tooltip-target="tooltip-default"
              >
                <p className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                  {parameter}:
                </p>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms[parameter] || ''}
                  onChange={(e) => handleSearch(e, parameter)}
                  className="mb-2 p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                />
                <div className='flex flex-col overflow-y-scroll max-h-96 p-1 no-scrollbar border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg dark:bg-gradient-to-t dark:from-gray-900 dark:to-gray-800'>
                  {filteredOptions(parameter).map((option) => (
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
                </div>
              </li>
            ))}
          </ul>

          <div className='flex flex-col w-auto flex-grow flex-wrap bg-gray-100 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-500'>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Gerar SKUs
            </button>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-black dark:text-white">SKUs Gerados</h2>
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
