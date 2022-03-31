const input = require('./2-input.json');

const expenseMap = new Map();
const revenueMap = new Map();

const makeMaps = (arr, type) => {
  if (type === 'expense') {
    arr.forEach(val => {
      let amount = 0;
      const date = val.startDate;
      if (expenseMap.has(date)) {
        amount = expenseMap.get(date) + val.amount;
      } else amount = val.amount;
      expenseMap.set(date, amount);
    });
  }

  if (type === 'revenue') {
    arr.forEach(val => {
      let amount = 0;
      const date = val.startDate;
      if (revenueMap.has(date)) {
        amount = revenueMap.get(date) + val.amount;
      } else amount = val.amount;
      revenueMap.set(date, amount);
    });
  }
};

makeMaps(input.expenseData, 'expense');
makeMaps(input.revenueData, 'revenue');

const expLastIndex = expenseMap.size - 1;
const revLastIndex = revenueMap.size - 1;

const expKeys = [...expenseMap.keys()].sort();
const revKeys = [...revenueMap.keys()].sort();
const year = [...expenseMap.keys()][0].slice(0, 4);

const maxMonth =
  expKeys[expLastIndex] > revKeys[revLastIndex]
    ? expKeys[expLastIndex].slice(6, 7)
    : revKeys[revLastIndex].slice(6, 7);

const a = Array(+maxMonth)
  .fill(0)
  .reduce((acc, val, i) => {
    const month = i > 9 ? `${i + 1}` : `0${i + 1}`;
    const date = `${year}-${month}-01T00:00:00.000Z`;

    return [
      ...acc,
      {
        amount: (revenueMap.get(date) || 0) - (expenseMap.get(date) || 0),
        startDate: date,
      },
    ];
  }, []);

console.log(a);
