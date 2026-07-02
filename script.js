"use strict";
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////

/*const arr = ["a", "b", "c", "d", "e", "f", "g"];
//slice method does not mutate the array
console.log(arr.slice(3, 5));
console.log(arr);

// the splice method mutates the array
console.log(arr.splice(2, 5)); //[c,g]
console.log(arr);

//reverse method mutates the array
const arr1 = ["f", "e", "d", "c", "b", "a"];
const arr2 = ["g", "h", "i", "j", "k"];
console.log(arr1.reverse());

//concatenate returns new array
const comArr = arr1.concat(arr2);
console.log(comArr);

const newestArr = arr1.slice(-1);
console.log(...newestArr);

// the at method is used to get values at a particular position
// in array like we use arr[]
console.log(arr2.at(-2));*/

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach(function (currentItem, index, array) {
  if (currentItem > 0) {
    console.log(
      `Transaction ${index + 1}: You saved ${currentItem} but this is the total transaction data`,
    );
  } else {
    console.log(
      `Transaction ${index + 1}: You withdrawed ${Math.abs(currentItem)}`,
    );
  }
});

console.log(`       `);

console.log(`------FOR EACH ON MAPS AND SETS -----`);
console.log(`       `);

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

currencies.forEach(function (currentitem, key, map) {
  console.log(`${key} : ${currentitem}`);
});*/
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayTrans = function (accs) {
  containerMovements.innerHTML = "";

  accs.movements.forEach(function (trans, i) {
    const type = trans < 0 ? "withdrawal" : "deposit";

    const html = `   <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__date"></div>
          <div class="movements__value">${trans}€</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUserName = function (acc) {
  acc.forEach(function (username, i) {
    const user = username.owner;
    username.initials = user
      .toLowerCase()
      .split(" ")
      .map((value) => value[0])
      .join("");
  });
};

createUserName(accounts);
console.log(accounts);

const displayBalance = function (accs) {
  const newBalance = accs.movements.reduce(function (acc, val) {
    return acc + val;
  });
  accs.balance = newBalance;

  labelBalance.innerHTML = newBalance + "€";
};

const rate = 1.1;
const transHistory = function (accounts) {
  const creditHs = accounts.movements
    .filter((val) => val > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.innerHTML = Math.round(creditHs) + "€";

  const debitHs = accounts.movements
    .filter((val) => val < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.innerHTML = Math.abs(debitHs) + "€";

  const interest = accounts.movements
    .filter((val) => val > 0)
    .map((val) => val * accounts.interestRate)
    .reduce((acc, val) => acc + val, 0);
  labelSumInterest.innerHTML = interest + "€";
};
const updateUI = function (accs) {
  displayTrans(accs);

  transHistory(accs);
  //Display balance

  displayBalance(accs);
};

let accountIn;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e);
  accountIn = accounts.find((acc) => acc.initials === inputLoginUsername.value);
  console.log(accountIn);

  if (accountIn && accountIn.pin === Number(inputLoginPin.value)) {
    labelWelcome.innerHTML = `Welcome ${accountIn.owner.split(" ")[0]}`;
    containerApp.style.opacity = 100;
  } else {
    console.log(`Wrong password`);
  }

  updateUI(accountIn);

  //clearInput fields after
  if (labelWelcome.innerHTML) {
    inputLoginUsername.value = "";
    inputLoginPin.value = "";
    inputLoginPin.blur();
  } else {
    alert("no need");
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e);
  console.log(accountIn);
  const transferAcc = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  const accountTo = accounts.find((acc) => acc.owner === transferAcc);

  //check if user has that  much funds in their account, if user exist,
  // if amount transfered is greater than 0, if account transfered to exists,
  //if account transfered to is not user itself

  if (
    amount > 0 &&
    accountTo &&
    accountTo.owner !== accountIn.owner &&
    accountIn.balance > amount
  ) {
    accountTo.movements.push(amount);
    accountIn.movements.push(-amount);
    updateUI(accountIn);
    console.log(`Transfer Successful`);
  } else {
    console.log(`Transfer Failed`);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  const checkPerc = amount / 10;
  accountIn.movements.some((mov) => mov >= checkPerc)
    ? accountIn.movements.push(amount)
    : console.log(`LOAN DISSAPROVED!`);

  updateUI(accountIn);
  console.log(checkPerc);
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(accountIn);

  if (
    accountIn.initials === inputCloseUsername.value &&
    accountIn.pin === Number(inputClosePin.value)
  ) {
    accounts.splice(
      accounts.findIndex((acc) => acc === accountIn),
      1,
    );
  } else {
    console.log(`Wrong!`);
  }
  containerApp.style.opacity = 0;
  inputClosePin.value = inputCloseUsername.value = "";
  console.log(accounts);
});

/*const toUsd = [200, 450, -400, 3000, -650, -130, 70, 1300];
const rate = 1.1;

const convertedToUsd = toUsd.map((usd) => usd * rate);
console.log(convertedToUsd);

const testFor = toUsd.forEach(function (value, i) {
  return `This is the ${value}: and it was the first ${i + 1}`;
});*/

/*Username Creation
const userName = "Albert faith segun";

const createUserName = function (acc) {
  acc.forEach(function (username, i) {
    const user = username.owner;
    username.initials = user
      .toLowerCase()
      .split(" ")
      .map((value) => value[0])
      .join("");
  });
};
createUserName(accounts);
console.log(accounts);

//test something
*/

/*


const movements = accounts.map(function (acc) {
  return acc.movements;
});

const movementsMap = movements
  .map(function (mov, i, arr) {
    return mov;
  })
  .join(",")
  .split(",");
const convNum = movementsMap.map(function (val, ind) {
  return Number(val);
});

console.log(convNum);

const withdrawals = convNum.filter(function (trans) {
  return trans < 0;
});

console.log(withdrawals);

const total = convNum.reduce(function (acc, val) {
  return acc + val;
}, 0);


*/

const testerForSort = [3, 7, 8, 9, 5];

testerForSort.sort((a, b) => {
  if (a < b) return 1;
});

console.log(testerForSort);
