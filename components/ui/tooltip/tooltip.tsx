import classes from "./tooltip.module.css";

function Tooltip({
  children,
  text,
}: {
  children?: React.ReactNode;
  text: string;
}) {
  return (
    <div className={classes["tooltip-container"]}>
      {children}
      <span className={classes["tooltip-text"]}>{text}</span>
    </div>
  );
}

export default Tooltip;
