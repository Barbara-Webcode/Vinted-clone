import "./button.css";

const Button = (props) => {
  return props.active ? (
    <button className={props.className} onClick={props.active}>
      {props.text}
    </button>
  ) : (
    <button className={props.className}>{props.text}</button>
  );
};

export default Button;
