import { useState } from 'react';
import { BsClipboard, BsFillInfoCircleFill, BsX } from 'react-icons/bs';
import parametersData from '../parameters.json';

const parameterOrder = ['Marca', 'Nome', 'Categoria', 'Cor', 'Subcategoria', 'Tamanho'];
const generateSKUCombinations = (selectedParameters) => {
  const combinations = [];

  function generateCombo(prefix, values, currentIndex) {
    if (currentIndex === parameterOrder.length) {
      combinations.push({ sku: prefix, values });
      return;
    }

    const currentParameter = parameterOrder[currentIndex];
    const currentValues = selectedParameters[currentParameter] || [];

    if (currentValues.length === 0) {
      generateCombo(prefix, { ...values }, currentIndex + 1);
    } else {
      for (const value of currentValues) {
        generateCombo(prefix + value, { ...values, [currentParameter]: value }, currentIndex + 1);
      }
    }
  }

  generateCombo('', [], 0);
  return combinations;
};

const copyToClipboard = (text) => {
  const textarea = document.createElement('textarea');
  textarea.textContent = text;
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
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
        [parameter]:
          selectedParameters[parameter]
            ? selectedParameters[parameter].filter((v) => v !== value)
            : [],
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

  const clearForm = () => {
    setSelectedParameters({});
    setSearchTerms({});
    setSkuList([]);

    // Uncheck all checkboxes
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  const [showAlert, setShowAlert] = useState(false); // Add showAlert state
  const showAlertMessage = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000); // Show alert for 3 seconds
  };

  const handleCopy = (text) => {
    copyToClipboard(text);
    showAlertMessage(); // Show the alert message when copying
  };


  return (
    <main className='dark:bg-black bg-gray-100 min-h-screen overflow-x-hidden'>
      {showAlert && (
        <div
          id="alert-border-3"
          role="alert"
          className="flex fixed z-50 top-4 left-0 right-0 mx-4 sm:mx-auto max-w-md px-4 py-2.5 mb-4 text-green-800 border border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-900 dark:border-green-600 rounded-lg shadow-lg justify-center items-center"
        >
          <BsFillInfoCircleFill className='text-green-400' />
          <div class="ml-3 text-sm font-medium leading-none">
            SKU copiado com <a href="#" class="font-semibold underline hover:no-underline">sucesso</a>.
          </div>
        </div>
      )}
      <div className="mx-auto px-4 pb-8 pt-4">
        <form onSubmit={handleSubmit} className="flex flex-col w-full justify-between items-start gap-4">
          <div className='flex flex-col sm:flex-row w-full justify-between gap-2 sm:gap-6'>
            <div className='flex gap-2 sm:gap-6'>
              <h1 className="text-4xl font-bold dark:text-white text-black ">SKU Generator</h1>
            </div>
            <div className='flex flex-grow gap-2 sm:gap-6 justify-between'>
              <button
                type="button" // Set the button type to "button"
                onClick={clearForm}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Limpar resultados
              </button>
              <button
                type="submit"
                className="w-96 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Gerar SKUs
              </button>
            </div>
          </div>

          <ul className="flex flex-row gap-4 w-full bg-gray-200 dark:bg-gray-800 rounded-lg px-6 py-4 overflow-x-scroll no-scrollbar">
            {Object.keys(parametersData).map((parameter) => (
              <li
                key={parameter}
                className="flex flex-col w-10/12"
                data-tooltip-target="tooltip-default"
              >
                <p className="text-lg font-semibold mb-2 text-black dark:text-gray-200">
                  {parameter}:
                </p>
                <input
                  type="text"
                  placeholder="Filtrar"
                  value={searchTerms[parameter] || ''}
                  onChange={(e) => handleSearch(e, parameter)}
                  className="mb-2 p-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 rounded-md"
                />
                <div className='flex flex-col overflow-y-scroll p-2 no-scrollbar border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-lg bg-gradient-to-t dark:from-gray-900 dark:to-gray-800' style={{ maxHeight: '50vh' }}>
                  {filteredOptions(parameter).map((option) => (
                    <label
                      key={option.id}
                      className="inline-flex items-center space-x-1 mr-4 mb-2 text-black dark:text-gray-400"
                    >
                      <input
                        type="checkbox"
                        value={option.id}
                        onChange={(e) => handleChange(e, parameter, option.id)}
                        className="rounded-md border-gray-300 dark:border-gray-500 dark:bg-transparent mr-1"
                      />
                      <span>{option.value}</span>
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          <div className='flex flex-col w-full flex-grow flex-wrap bg-gray-100 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-500'>

            <h2 className="top-0 text-2xl font-bold mb-4 text-black dark:text-white">SKUs Gerados</h2>
            <div className='w-full border border-gray-500 rounded-lg overflow-x-scroll no-scrollbar'>
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-black dark:text-white text-center">Ações</th> {/* Add action column */}
                    <th className="px-4 py-2 text-black dark:text-white text-left">SKU</th>
                    {parameterOrder.map((parameter) => (
                      <th key={parameter} className="px-4 py-2 text-black dark:text-white text-left">
                        {parameter}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {skuList.map((skuData, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-700 odd:bg-gray-600 cursor-pointer"
                      onClick={() => handleCopy(skuData.sku)} // Copy SKU when row is clicked
                    >
                      <td className="px-4 leading-tallest text-white font-mono text-center">
                        <button
                          type="button"
                          className="text-white"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event
                            handleCopy(skuData.sku);
                          }}
                        >
                          <BsClipboard />
                        </button>
                      </td>
                      <td className="px-4 leading-tallest text-white font-mono">{skuData.sku}</td>
                      {parameterOrder.map((parameter) => {
                        const option = parametersData[parameter].find(
                          (option) => option.id === skuData.values[parameter]
                        );
                        return (
                          <td
                            key={parameter}
                            className="px-4 leading-tallest text-white font-mono"
                          >
                            {option ? option.value : ""}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default IndexPage;
