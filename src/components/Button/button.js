import Button from "@material-ui/core/Button";

export default function ButtonHandler(props) {
  let defaultStyle = {
    maxHeight: "40px",
    backgroundColor: "#409EFF",
    borderColor: "#409EFF",
    color: "white",
    textTransform: "none"
  };
  if (props.boxShadow) {
    defaultStyle = {
      ...defaultStyle,
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 141px 0 rgba(0, 0, 0, 0.19)",
      border: props.border ? " " : "1px solid rgba(191, 190, 190, 0.1)",
    };
  }
  return (
    <Button
      className={props.className ? props.className : ""}
      style={props.style ? props.style : defaultStyle}
      onClick={props.onClick ? props.onClick : ""}
      disabled={props.disabled}
      type={props.submit ? props.submit : ""}
    >
      {props.icon ? props.icon : ""}{props.name ? props.name : ""}
    </Button>
  );
}