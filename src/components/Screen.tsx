interface Display {
  value: string;
}

const Screen = ({ value }: Display) => {
  return <div className="screen">{value}</div>;
};

export default Screen;
