const Button = (props) => {
  const handleClick = () => console.log("Button");

  return (
    <button onClick={handleClick} className="button">{props.text}</button>
  );
};

export default Button;