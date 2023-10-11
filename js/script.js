const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

console.log([typingText, inpField, tryAgainBtn, timeTag, mistakeTag, wpmTag, cpmTag]);

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

console.log(timer, maxTime, timeLeft, charIndex, mistakes, isTyping);

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

console.log(inpField, tryAgainBtn);

function loadParagraph() {
    console.log('loadParagraph start');

    const ranIndex = Math.floor(Math.random() * paragraphs.length);

    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });

    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());

    console.log('loadParagraph end');
}

function initTyping() {
    console.log('initTyping start');

    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    console.log(characters, typedChar);

    if (charIndex < characters.length - 1 && timeLeft > 0) {
        console.log('typing');

        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        console.log(2);

        if (typedChar == null) { console.log('typedChar null');
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }

                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else { console.log('typedChar not null');
            if (characters[charIndex].innerText == typedChar) { console.log('correct');
                characters[charIndex].classList.add("correct");
            } else { console.log('incorrect');
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            
            console.log('increasing charIndex...');

            charIndex++;

            console.log('charIndex: ', charIndex);
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        console.log(characters[charIndex]);

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        console.log('result: ', wpm, mistakes);

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        console.log('terminated');

        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    console.log('initTimer called...');

    if (timeLeft > 0) { console.log('time left');
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else { console.log('time left not greater than 0');
        clearInterval(timer);
    }
}

function resetGame() {
    console.log('resetGame called...');

    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}