"use strict";

//access the slider
const slider = document.getElementById("password-slider");

//access the sliver value h2/p
const sliderValue = document.querySelector(".slider-value");

const passwordOptionsContainer = document.querySelector(".password-options");

const generateButton = document.querySelector("button");

const generatedPassword = document.querySelector(".generated-password");

// Checkboxes
const checkedUppercase = document.getElementById("includesUppercase");

const checkedLowercase = document.getElementById("includesLowercase");

const checkedNumbers = document.getElementById("includesNumbers");

const checkedSymbols = document.getElementById("includesSymbols");

// Clipboard
const clipBoard = document.getElementById("clipboard");
const strengthDivs = document.querySelectorAll(".strength");
let currentStrength = 4;

const root = document.querySelector(":root");
root.style.setProperty("--slider-percentage", "50%");

function calcPercentage(current) {
  const p = (100 / 20) * current;
  console.log(p);
  root.style.setProperty("--slider-percentage", `${p}%`);
}
function sliderValueChange(value) {
  sliderValue.textContent = value;
}
//current - strength

const passwordStrength = document.querySelector(".password-strength");
console.log(passwordStrength);

updateStrengthMeter(currentStrength);

const passwordConditions = {
  includesUppercase: true,
  includesLowercase: true,
  includesNumbers: true,
  includesSymbols: true,

  //lets create a function that determines how many are true

  getNumberOfTrue: function () {
    let numberOfTrue = 0;
    Object.values(this).forEach((value) => {
      if (value === true) {
        numberOfTrue += 1;
      }
    });
    return numberOfTrue;
  },
};

const passwordConditionsFunction = {
  includesUppercase: function (value) {
    let characters = "";
    for (let i = 1; i <= value; i++) {
      characters += String.fromCharCode(randomASCII(90, 65));
    }
    return characters;
  },
  includesLowercase: function (value) {
    let characters = "";
    for (let i = 1; i <= value; i++) {
      characters += String.fromCharCode(randomASCII(122, 97));
    }
    return characters;
  },

  includesNumbers: function (value) {
    let characters = "";
    for (let i = 1; i <= value; i++) {
      characters += String.fromCharCode(randomASCII(57, 48));
    }
    return characters;
  },

  includesSymbols: function (value) {
    let characters = "";
    for (let i = 1; i <= value; i++) {
      characters += String.fromCharCode(randomASCII(47, 33));
    }

    return characters;
  },
};

const validation = {
  //checks if string has uppercase letter
  includesUppercase: (value) => /[A-Z]/.test(value),
  includesLowercase: (value) => /[a-z]/.test(value),
  includesNumbers: (value) => /[0-9]/.test(value),
  includesSymbols: (value) => /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(value),
};

function populateCharacters(length) {
  //populatedString
  let populatedString = "";
  const trueConditions = passwordConditions.getNumberOfTrue();

  let numberOfCharactersPer = Math.floor(length / trueConditions);

  let remainder = length % trueConditions;

  const totalChracters = length;

  Object.keys(passwordConditions).forEach((key) => {
    if (passwordConditions[key] === true) {
      populatedString += passwordConditionsFunction[key](
        numberOfCharactersPer + remainder
      );
      remainder = 0;
    }
  });

  generatedPassword.style.color = "white"; // reset password text colour since it's no longer in the clipboard
  return shuffleString(populatedString);
}

function shuffleString(passwordString) {
  let shuffleArr = passwordString.split("");

  //I need to figure out how sort works
  return shuffleArr.sort((a, b) => 0.5 - Math.random()).join("");
}

function boxChecked(value) {
  passwordConditions[value.id] = value.checked;

  console.log(`${value.id} is ${passwordConditions[value.id]}`);
  value.checked ? currentStrength++ : currentStrength--;
  updateStrengthMeter(currentStrength);
  console.log(`Current Strength is: ${currentStrength}`);
}

function randomASCII(max, min) {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max) + 1;

  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
}

// 0 - 9 = 48-57
//numbers
randomASCII(57, 48);

//A-Z = 65 - 90
//uppercase
randomASCII(90, 65);

//a - z = 97 - 122
//lowercase
randomASCII(122, 97);

//special characters
randomASCII(47, 33);

// Event Listeners

generateButton.addEventListener("click", (e) => {
  e.preventDefault;
  generatedPassword.textContent = populateCharacters(sliderValue.textContent);
});

clipBoard.addEventListener("click", () =>
  copyToClipboard(generatedPassword.textContent)
);

async function copyToClipboard(text) {
  const type = "text/plain";

  const clipBoardItemdata = {
    [type]: text,
  };

  const clipboardItem = new ClipboardItem(clipBoardItemdata);

  await navigator.clipboard.write([clipboardItem]);
  generatedPassword.style.color = "green";
}

function updateStrengthMeter(value) {
  for (let i = 0; i <= strengthDivs.length - 1; i++) {
    strengthDivs[i].classList.remove("current-strength");
  }
  for (let i = 0; i <= value - 1; i++) {
    strengthDivs[i].classList.add("current-strength");
  }

  switch (value - 1) {
    case 0:
      passwordStrength.textContent = "Weak";
      break;
    case 1:
      passwordStrength.textContent = "Good";
      break;
    case 2:
      passwordStrength.textContent = "Strong";
      break;
    case 3:
      passwordStrength.textContent = "Excellent";
      break;

    default:
      console.log("how");
      break;
  }
}

// ASCII TABLE
/*
0	48	digit 0
1	49	digit 1
2	50	digit 2
3	51	digit 3
4	52	digit 4
5	53	digit 5
6	54	digit 6
7	55	digit 7
8	56	digit 8
9	57	digit 9

--------------

A	65	uppercase A
B	66	uppercase B
C	67	uppercase C
D	68	uppercase D
E	69	uppercase E
F	70	uppercase F
G	71	uppercase G
H	72	uppercase H
I	73	uppercase I
J	74	uppercase J
K	75	uppercase K
L	76	uppercase L
M	77	uppercase M
N	78	uppercase N
O	79	uppercase O
P	80	uppercase P
Q	81	uppercase Q
R	82	uppercase R
S	83	uppercase S
T	84	uppercase T
U	85	uppercase U
V	86	uppercase V
W	87	uppercase W
X	88	uppercase X
Y	89	uppercase Y
Z	90	uppercase Z

---------

a	97	lowercase a
b	98	lowercase b
c	99	lowercase c
d	100	lowercase d
e	101	lowercase e
f	102	lowercase f
g	103	lowercase g
h	104	lowercase h
i	105	lowercase i
j	106	lowercase j
k	107	lowercase k
l	108	lowercase l
m	109	lowercase m
n	110	lowercase n
o	111	lowercase o
p	112	lowercase p
q	113	lowercase q
r	114	lowercase r
s	115	lowercase s
t	116	lowercase t
u	117	lowercase u
v	118	lowercase v
w	119	lowercase w
x	120	lowercase x
y	121	lowercase y
z	122	lowercase z

---------------------
!	33	exclamation mark
"	34	quotation mark
#	35	number sign
$	36	dollar sign
%	37	percent sign
&	38	ampersand
'	39	apostrophe
(	40	left parenthesis
)	41	right parenthesis
*	42	asterisk
+	43	plus sign
,	44	comma
-	45	hyphen
.	46	period
/	47	slash

 */
