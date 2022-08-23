import HistoryIcon from "../icons/HistoryIcon";
interface Display {
  value: string;
}

const Screen = ({ value }: Display) => {
  const handleClick = () => {
    console.log("hello");
  };

  return (
    <div id="screen">
      <div id="screen-top">
        <HistoryIcon style={{ cursor: "pointer" }} onClick={handleClick} />
        <div id="prev-equation"></div>
      </div>
      <div id="screen-bottom">{value}</div>
    </div>
  );
};

export default Screen;
