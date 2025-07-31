let price = 19.5;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const amount = [0.01*100, 0.05*100, 0.1*100, 0.25*100, 1*100, 5*100, 10*100, 20*100, 100*100];

let count = 0;

const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const total = document.getElementById("total");
const changeInDrawer = document.getElementById("change-in-drawer"); 

window.addEventListener("load", ()=>{
  cid.forEach((el)=>{
    changeInDrawer.innerHTML += `<span>${el[0]}: $${el[1]}</span>`
  });
  total.textContent = `Total: $${price}`
})

const notExactChange = (change)=>{
  for(let i = amount.length-2; i >= 0; i--){
    let sum = 0;
    for(let j = 0; j <= i; j++){
      sum += cid[j][1];
    }
    if(cid[i+1][1] !== 0 && change/(amount[i+1]/100) < 1 && sum/100 < change){
      return true;
    }
  }
  return false;
}

const purchase = ()=>{
  count++;
  if(count===1){
    cid.forEach(el=>{
    el[1]*=100;
  });
  }
  let change = (Number(cash.value) - price)*100;
  const sum = cid.reduce((acc, el)=>acc+el[1], 0);
  changeDue.innerHTML = "";

  if(Number(cash.value) < price){
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if(Number(cash.value) === price){
    changeDue.innerHTML = "<span>No change due - customer paid with exact cash</span>";
    return;
  }

  if(sum < change || notExactChange(change/100)){
    changeDue.innerHTML = "<span>Status: INSUFFICIENT_FUNDS</span>";
    return;
  } else if(sum === change){
    changeDue.innerHTML = "<span>Status: CLOSED</span>";
  } else{
    changeDue.innerHTML = "<span>Status: OPEN</span>";
  }

  for(let i = amount.length-1; i >= 0; i--){
    if(change/(amount[i]) >= 1 && cid[i][1] > 0){
      const payAmount = change/cid[i][1] >= 1 ? cid[i][1]/100 : Math.floor(change/amount[i])*amount[i]/100;
      change -= payAmount*100;
      changeDue.innerHTML += `<span>${cid[i][0]}: $${payAmount}</span>`;
      cid[i][1] -= payAmount*100;
      changeInDrawer.innerHTML = "<h2>Change in drawer:</h2>";
      cid.forEach((el)=>{
    changeInDrawer.innerHTML += `<span>${el[0]}: $${el[1]/100}</span>`
  });
    }
  }
}

purchaseBtn.addEventListener("click", purchase)

cash.addEventListener("keydown", (e)=>{
  if(e.key === "Enter"){
    purchase();
  }
})