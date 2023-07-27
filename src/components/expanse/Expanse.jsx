
import React, { useEffect, useState } from "react";
import expenseImg from "./expanse.jpg";


const Expanse = () => {

    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDescription, setExpenseDescription] = useState("");

    const [expenseData, setExpenseData] = useState(
        JSON.parse(localStorage.getItem("expenseData")) || []
      );

      const submitExpenseHandler = (e) => {
        e.preventDefault();
        const form = e.target;
        const newExpense = {
          amount: expenseAmount,
          description: expenseDescription,
        };
    
        setExpenseData([...expenseData, newExpense]);
        form.reset();
      };

   // Function to calculate the total salary
  const calculateTotalExpenses = () => {
    let totalExpenses = 0;
    expenseData.forEach((expense) => {
      totalExpenses += Number(expense.amount);
    });
    return totalExpenses;
  };

     // keep data in localstorage for accessibility
  useEffect(() => {
    localStorage.setItem("expenseData", JSON.stringify(expenseData));
  }, [expenseData]);

  useEffect(() => {
    const storedExpenseData = localStorage.getItem("expenseData");
    if (storedExpenseData) {
      setExpenseData(JSON.parse(storedExpenseData));
    }
  }, []);
  

   // clearing all data from Local Storage
   const handleClearExpenseAllData = () => {
    const getStoredData = localStorage.getItem("expenseData");
    if (getStoredData) {
      localStorage.removeItem("expenseData");
      setExpenseData([]);
    }
  };
    return (
       <div>
        <div className="container m-auto ">
      <h2 className="text-3xl text-center py-5 pt-7 font-bold">
        Expense your money
      </h2>

      <form
        onSubmit={submitExpenseHandler}
        action=""
        className="bg-white rounded-md my-5 mb-16 py-6 px-4 md:flex flex-row-reverse justify-between items-center gap-2"
      >
        <div className="space-y-4 w-full">
          <div>
            <label htmlFor="whereExpense" className=" font-bold text-xl">
              Why cost?
            </label>
            <input
              type="text"
              className=" block border p-2 rounded w-full outline-none  focus:border-orange-500 "
              placeholder="Description"
              name="whereExpense"
              required
              onChange={(event) => setExpenseDescription(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="expenseSalary" className=" font-bold text-xl">
              How much cost?
            </label>
            <input
              type="text "
              className=" block border p-2 rounded w-full outline-none focus:border-orange-500"
              placeholder="amount"
              name="expenseSalary"
              required
              onChange={(event) => setExpenseAmount(event.target.value)}
            />
          </div>

          <button className="primary-button w-full"> Expense money</button>
        </div>

        <img src={expenseImg} alt="" className=" w-full md:w-1/2" />
      </form>

      <div
        className="bg-white container rounded-md py-6 px-5
      "
      >
        <h2 className="text-3xl pb-5 text-center font-bold">
          Your Expense statement
        </h2>

        {expenseData.length === 0 ? (
          <p className="text-2xl pb-5 text-center">
            No expenses or transactions recorded yet.
          </p>
        ) : (
          <div className="flex flex-col items-center">
            {expenseData.map((expense, idx) => (
              <div
                className="flex gap-4 justify-center items-center bg-gray-200 rounded md:w-1/3 m-1 w-full"
                key={idx}
              >
                <p className="font-bold text-xl">{expense.description}:</p>
                <p className="font-bold text-xl">${expense.amount}</p>
              </div>
            ))}
          </div>
        )}

        <div className="m-auto text-center">
          {expenseData.length > 0 && (
            <div className="flex justify-center items-center gap-4 py-3">
              <h2 className="font-bold text-2xl"> Your total expenses:</h2>
              <p className="font-bold text-2xl">${calculateTotalExpenses()}</p>
            </div>
          )}

          {expenseData.length > 0 ? (
            <button
              onClick={handleClearExpenseAllData}
              className="bg-red-600 py-1 px-5 text-white font-bold rounded hover:bg-red-800"
            >
              Clear All Expense
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

export default Expanse;