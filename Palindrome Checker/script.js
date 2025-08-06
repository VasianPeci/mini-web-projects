const inputText = document.getElementById('text-input');
const button = document.getElementById('check-btn');
const result = document.getElementById('result');

function isPalindrome(charArray){
  const n = charArray.length;
  for(let i = 0; i < n/2; i++){
    if(charArray[i] !== charArray[n-i-1]){
      return false;
    }
  }
  return true;
}

function checkInput(){
  const regex = /[/\\\(\)\s_,\.-]/g;
  const charArray = [...inputText.value.toLowerCase().replace(regex, '')];
  if (inputText.value.toLowerCase().replace(regex, '') === '') {
    alert('Please input a value');
    return;
  } else if (isPalindrome(charArray)) {
    result.style.padding = '30px';
    result.style.color = 'green';
    result.innerText = `${inputText.value} is a palindrome`;
  } else{
    result.style.padding = '30px';
    result.style.color = 'red';
    result.innerText = `${inputText.value} is not a palindrome`;
  }
}

button.addEventListener('click', checkInput);