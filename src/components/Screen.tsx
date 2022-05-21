interface Display {
  value: string;
}

const Screen = ({ value }: Display) => {
  return <div id="screen">{value}</div>;
};

export default Screen;
