const Input = (props) => {
  const handleChange = () => console.log('Input');

  return (
    <input onChange={handleChange} type={props.type} placeholder={props.placeholder} />
  )
}

export default Input;