const App = () => {
  
  const [display, setDisplay] = React.useState("0");
  const [input, setInput] = React.useState("");
  
  const handleClick = (event) => {

    let newInput =""
    let newDisplay = ""
    const key = document.getElementById(event.target.id)

    // Not allow a number to begin with multiple zeros.
    if(/[0-9]/.test(key.value)){

      //Reset the input and display after calculation
      if(/=/.test(input)){
        newInput = key.value ;
        newDisplay = key.value;
      }else {
        newInput = removeLeftZero(input) + key.value ;
        newDisplay = removeLeftZero(display) + key.value ;
      }
      
      setInput(newInput);
      setDisplay(newDisplay)
    }  

    // Pressing the clear button clears the input and output values, and returns the calculator to its initialized state
    if(key.id == "clear"){
      setInput("") ;
      setDisplay("0") ;
    }  

    // Two . in one number should not be accepted.
    if(key.id == "decimal" && /^[^.]*$/.test(display)) {
      newInput = removePervCalc(input) + key.value ;
      if (input == ""){
        newInput = "0" + key.value
      }
      setInput(newInput);
      setDisplay(newInput)
    }

    //If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign)
    if(/[\+\-\*\/]$/.test(key.value)){
      newInput = removePervCalc(input) + key.value ;

      //If 2 or more operators are entered consecutively, the operation performed should be the last operator entered
      if(/[\+\-\*\/]$/.test(input)) {
        
        newInput = input.replace(/[\+\-\*\/]+$/, key.value) ;
      }
      setInput(newInput);
      setDisplay(key.value)
      }

      //Set the exception for the (-) sign
      if(key.value == "-" && /[^-]$/.test(input) && ! /[\+\*\/][\+\*\/]$/.test(input)) {
        newInput = removePervCalc(input) + key.value ;
        setInput(newInput);
        setDisplay(key.value)
      }

      // In any order, I should be able to add, subtract, multiply and divide a chain of numbers of any length, and when I hit =, the correct result should be shown in the element with the id of display.
      if(key.value == "=" ){
      
        newInput = input + key.value  + eval(input);
        setDisplay(eval(input))
        setInput(newInput);
        
      }

  }

  
  return (
    <div className="container">
      <div className="display">
        <Input input={input} />
        <Display display={display} />
      </div>
      <Calculator board={board} handleClick={handleClick}/>
    </div>
  );
}

  const Calculator = ({ board, handleClick}) => (
    <div className="calculator">
      {board.map((button) => (<button id={button.id} value={button.value} className="button" onClick={handleClick}> {button.sign ? button.sign : button.value}</button> ))}
    </div>
    );
 
  const Input = ({input}) => ( <div className="inputs">{input} </div> );
  const Display = ({display}) => ( <div id="display">{display} </div> );
  
    const numbers = [
      {id:"zero", value: 0},
      {id:"one", value: 1},
      {id:"two", value: 2},
      {id:"three", value: 3},
      {id:"four", value: 4},
      {id:"five", value: 5},
      {id:"six", value: 6},
      {id:"seven", value: 7},
      {id:"eight", value: 8},
      {id:"nine", value: 9},
    ];

    const operators = [
      {id:"equals", sign: "=" ,value: "="},
      {id:"add", sign: "+", value: "+"},
      {id:"subtract", sign: "-", value: "-"},
      {id:"multiply", sign: "x", value: "*"},
      {id:"divide", sign: "/", value: "/"},
      {id:"decimal", sign: ".", value: "."},
      {id:"clear", sign: "AC", value: ""}
    ]
    const board = [...operators, ...numbers]


    const removeLeftZero = (x) => x.replace(/^[0]+$/ ,"")
    const removePervCalc = (x) => { 
      let result = x.split("=");
      return result[result.length-1];
    }

    ReactDOM.render(<App />, document.getElementById("root"));