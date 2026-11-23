import "./logInput.css";
const LogInput = ({ value, setValue, type, id, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      placeholder={placeholder}
      id={id}
    />
  );
};

export default LogInput;
