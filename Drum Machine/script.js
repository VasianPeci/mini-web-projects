const drumPads = document.querySelectorAll(".drum-pad");
const display = document.getElementById("display");

drumPads.forEach(drumPad => {
  drumPad.addEventListener("click", ()=>{
    const audio = document.getElementById(`${drumPad.textContent}`);
    audio.play();
    display.textContent = drumPad.textContent;
  });
  document.addEventListener("keydown", (event)=>{
    if(event.key === drumPad.textContent || event.key === drumPad.textContent.toLowerCase()){
      const audio = document.getElementById(`${drumPad.textContent}`);
      audio.play();
      display.textContent = drumPad.textContent;
    }
  })
})