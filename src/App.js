import { useEffect, useState } from 'react';
import "./app.css"
function App() {

  const [options, setOptions] = useState([]);
  const [input1, setInput1] = useState({ currency: "USD", amount: 1 });
  const [input2, setInput2] = useState({ currency: "EUR", amount: 0 });

  const getData = async (amount, from, to, setState) => {
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
      .then(resp => resp.json())
      .then((data) => {
        setState({ amount: data.rates[to], currency: to })
      });
  }

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.frankfurter.app/currencies');
      const data = await response.json();
      const options = Object.keys(data).map((currencyCode) => ({
        value: currencyCode,
        label: data[currencyCode],
      }));
      setOptions(options);
      getInitialValues()
    } catch (error) {
      console.error(error);
    }
  }


  const getInitialValues = () => {
    fetch(`https://api.frankfurter.app/latest?amount=${input1.amount}&from=${input1.currency}&to=${input2.currency}`)
      .then(resp => resp.json())
      .then((data) => {
        setInput2({ ...input2, amount: data.rates[input2.currency] })
      });
  }

  useEffect(() => {
    fetchCurrencies();

  }, []);

  function handleAmount1(e) {
    const newAmount = e.target.value
    setInput1({ ...input1, amount: newAmount })
    getData(newAmount, input1.currency, input2.currency, setInput2)
    ///amount, from, to, setState
  }

  function handleAmount2(e) {
    const newAmount = e.target.value
    setInput2({ ...input2, amount: newAmount })
    getData(newAmount, input2.currency, input1.currency, setInput1)
    ///amount, from, to, setState
  }

  function handleSelect1(e) {
    const newCurrency = e.target.value
    setInput1({ ...input1, currency: newCurrency })
    getData(input1.amount, newCurrency, input2.currency, setInput2)
    ///amount, from, to, setState

  }

  function handleSelect2(e) {
    const newCurrency = e.target.value
    setInput2({ ...input2, currency: newCurrency })
    ///getData
    getData(input1.amount, input1.currency, newCurrency, setInput2)
    ///amount, from, to, setState

  }

  return (
    <div className="App">
      <div class="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

        <div className="flex items-center justify-center flex-col  h-screen">
          <div className="bg-glass rounded m-3 z-10 p-3">
            <h1 className='text-3xl text-center text-black'>Currency converter</h1>
            <div className="flex flex-col md:flex-row m-3 ">
              <input type="text" value={input1.amount} onChange={(e) => handleAmount1(e)} className="input input-bordered input-info mx-1" />

              <select value={input1.currency} onChange={(e) => handleSelect1(e)} className="select select-info mx-1 my-2 md:my-0">
                {options.map((option, index) => (
                  <option key={index} disabled={option.value === input2.currency} value={option.value}>{option.label}</option>
                ))}
              </select>

            </div>
            <div className="flex flex-col md:flex-row m-3">

              <input type="text" value={input2.amount} onChange={(e) => handleAmount2(e)} className="input input-bordered input-error mx-1" />

              <select value={input2.currency} onChange={(e) => handleSelect2(e)} className="select select-error my-2 md:my-0 mx-1">

                {options.map((option, index) => (
                  <option key={index} disabled={option.value === input1.currency} value={option.value}>{option.label}</option>
                ))}

              </select>
            </div>
            <div >
              <a href='https://github.com/halil180' target='_blank' rel="noreferrer" >
                <svg className=" hover:bg-red-500 rounded" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" /></svg>
              </a>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default App;