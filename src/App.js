import "./styles.css";
import { useState } from "react";
import timer from "./images/timer.gif";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function App() {
  const [inputDate, setInputDate] = useState();
  const [output, setOutput] = useState();
  const daysInMon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function clickHandler() {
    if (inputDate) {
      setOutput(<img alt="" src={timer} />);
      setTimeout(() => {
        outputHandler();
      }, 3000);
    }
  }

  function outputHandler() {
    let dateArr = inputDate.split("-");
    let date = {
      day: Number(dateArr[2]),
      month: Number(dateArr[1]),
      year: Number(dateArr[0])
    };

    let isPalindrome = checkPalindromeForAllFormat(date);
    let [missedDays, nextDate] = getNextPalindromeDate(date);

    if (inputDate !== "") {
      if (isPalindrome) {
        setOutput("yay! your birthday is palindrome");
      } else {
        setOutput(
          "Your birthday is not palindrome. You are missed by " +
            missedDays +
            " and next palindrome date is " +
            nextDate.day +
            "-" +
            nextDate.month +
            "-" +
            nextDate.year
        );
      }
    }
  }

  // reverse string function
  function reverseStr(str) {
    let reversed = str.split("").reverse().join("");
    return reversed;
  }
  // check for palindrome function
  function isPalindrome(str) {
    let reversed = reverseStr(str);
    return str === reversed;
  }
  // object date function
  function dateStr(dates) {
    // object date in str
    let dateObj = {
      day: "",
      month: "",
      year: ""
    };
    if (dates.day < 10) {
      dateObj.day = "0" + dates.day;
    } else {
      dateObj.day = dates.day.toString();
    }

    if (dates.month < 10) {
      dateObj.month = "0" + dates.month;
    } else {
      dateObj.month = dates.month.toString();
    }

    dateObj.year = dates.year.toString();

    return dateObj;
  }

  // function for dates in all format
  function allFormatDates(dates) {
    let givenDate = dateStr(dates);
    let ddmmyyyy = givenDate.day + givenDate.month + givenDate.year;
    let mmddyyyy = givenDate.month + givenDate.day + givenDate.year;
    let yyyymmdd = givenDate.year + givenDate.month + givenDate.day;
    let ddmmyy = givenDate.day + givenDate.month + givenDate.year.slice(-2);
    let mmddyy = givenDate.month + givenDate.day + givenDate.year.slice(-2);
    let yymmdd = givenDate.year.slice(-2) + givenDate.month + givenDate.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  // check palindrome for all dates format
  function checkPalindromeForAllFormat(dates) {
    let listOfAllFormat = allFormatDates(dates);
    let flag = false;
    for (var i = 0; i < listOfAllFormat.length; i++) {
      if (isPalindrome(listOfAllFormat[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }
  // checking leap year
  function checkLeapYear(dates) {
    if (dates.year % 400 === 0) {
      return true;
    }
    if (dates.year % 100 === 0) {
      return false;
    }
    if (dates.year % 4 === 0) {
      return true;
    }
    return false;
  }
  // function to get next day
  function getNextDate(dates) {
    let day = dates.day + 1;
    let month = dates.month;
    let year = dates.year;

    if (month === 2) {
      if (checkLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      if (day > daysInMon[month - 1]) {
        day = 1;
        month++;
      }
    }

    if (month > 12) {
      month = 1;
      year++;
    }

    return {
      day: day,
      month: month,
      year: year
    };
  }
  // function for next palindromedate and total missed days
  function getNextPalindromeDate(dates) {
    let nextDate = getNextDate(dates);
    let missedDays = 0;
    while (1) {
      missedDays++;
      let palindromeDate = checkPalindromeForAllFormat(nextDate);
      if (palindromeDate) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
    return [missedDays, nextDate];
  }

  return (
    <div className="App">
      <div className="content">
        <h1 className="title">Birthday Palindrome</h1>
        <h2>This app will Check whether your Birthday is Palindrome or not!</h2>
        <div className="form">
          <label>Please enter your Birthdate!</label>
          <input type="date" onChange={(e) => setInputDate(e.target.value)} />
          <button onClick={clickHandler}>Check</button>
        </div>
        {inputDate && <h3 className="output">{output}</h3>}
      </div>
      <footer>
        <h1>connect with me</h1>
        <div className="social-links ">
          <ul>
            <li className="hvr-buzz">
              <a href="https://twitter.com/mikesch_34">
                <FaTwitter color="white" size="2rem" />
              </a>
            </li>
            <li className="hvr-buzz">
              <a href="https://www.linkedin.com/in/mahendra-chauhan-b111561b1/">
                <FaLinkedinIn color="white" size="2rem" />
              </a>
            </li>
            <li className="hvr-buzz">
              <a href="https://github.com/mikesch803">
                <FaGithub color="white" size="2rem" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
      {/* <p>Made with ❤️ by Mahendra😄</p> */}
    </div>
  );
}
