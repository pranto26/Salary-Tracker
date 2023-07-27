import React, { useEffect, useState } from "react";
import incomeImg from "./income.avif";

const Income = () => {

    const [incomeData, setIncomeData] = useState(
        JSON.parse(localStorage.getItem("incomeData")) || []
      );
      const submitIncomeHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const incomeSource = form.incomeSource.value;
        const incomeSalary = form.incomeSalary.value;
    
        const newIncome = {
          salary: incomeSalary,
          source: incomeSource,
        };
        setIncomeData([...incomeData, newIncome]);
        form.reset();
      };

      // Function to calculate the total salary
  const calculateTotalSalary = () => {
    let totalSalary = 0;
    incomeData.forEach((income) => {
      totalSalary += Number(income.salary);
    });
    return totalSalary;
  };

  // keep data in localstorage for accessibility
  useEffect(() => {
    localStorage.setItem("incomeData", JSON.stringify(incomeData));
  }, [incomeData]);

  // get data from localstorage for showing in website
  useEffect(() => {
    const storedIncomeData = JSON.parse(localStorage.getItem("incomeData"));
    if (storedIncomeData) {
      setIncomeData(storedIncomeData);
    }
  }, []);

  // clearing all data from Local Storage
  const handleClearIncomeAllData = () => {
    localStorage.removeItem("incomeData");
    setIncomeData([]);
  };
    return (
        <div>
                 <div className="container m-auto">
      <h2 className="text-3xl text-center py-5 pt-7 font-bold">
        Credit your salary here!
      </h2>

      <form
        onSubmit={submitIncomeHandler}
        action=""
        className="bg-white rounded-md my-5 mb-14 py-6 px-4 md:flex justify-between items-center gap-2 "
      >
        <div className="space-y-4 w-full">
          <div>
            <label htmlFor="incomeSource" className=" font-bold text-xl">
              Income Source
            </label>
            <input
              type="text"
              className=" block border p-2 rounded w-full outline-none  focus:border-orange-500 "
              placeholder="Description"
              name="incomeSource"
              required
            />
          </div>

          <div>
            <label htmlFor="incomeSalary" className=" font-bold text-xl">
              Amount
            </label>
            <input
              type="text "
              className=" block border p-2 rounded w-full outline-none focus:border-orange-500"
              placeholder="amount"
              name="incomeSalary"
              required
            />
          </div>

          <button className="primary-button w-full"> Add</button>
        </div>

        <img src={incomeImg} alt="" className=" w-full md:w-1/2" />
      </form>

      <div
        className="bg-white container rounded-md py-6 px-5 border
      "
      >
        <h2 className="text-3xl pb-5 text-center font-bold">
          Your income statement is here
        </h2>

        {incomeData.length === 0 ? (
          <p className="text-2xl pb-5 text-center">
            No credits or transactions recorded yet.
          </p>
        ) : (
          <div className="flex flex-col items-center">
            {incomeData.map((income, idx) => (
              <div
                className="flex gap-4 justify-center items-center bg-gray-200 rounded md:w-1/3 m-1 w-full"
                key={idx}
              >
                <p className="text-xl">{income.source}:</p>
                <p className="text-xl">${income.salary}</p>
              </div>
            ))}
          </div>
        )}

        <div className="m-auto text-center">
          {incomeData.length > 0 && (
            <div className="flex justify-center items-center gap-4 py-3">
              <h2 className="font-bold text-3xl"> Your total income is:</h2>
              <p className="font-bold text-3xl">${calculateTotalSalary()}</p>
            </div>
          )}

          {incomeData.length > 0 ? (
            <button
              onClick={handleClearIncomeAllData}
              className="bg-red-600 py-1 px-5 text-white font-bold rounded hover:bg-red-800"
            >
              Clear All
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
            
        </div>
    );
};

export default Income;