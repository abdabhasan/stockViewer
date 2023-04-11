import "./ChartButtons.scss";

const ChartButtons = ({ dateFormat, setDateFormat }) => {
  const renderButtonSelect = (button) => {
    const classes = "btn m-1 ";
    if (button === dateFormat) {
      return classes + "btn-secondary";
    } else {
      return classes + "btn-outline-secondary";
    }
  };
  return (
    <div className="mx-auto text-center">
      <button
        className={renderButtonSelect("24h")}
        onClick={() => setDateFormat("24h")}
      >
        24h
      </button>
      <button
        className={renderButtonSelect("7d")}
        onClick={() => setDateFormat("7d")}
      >
        7d
      </button>
      <button
        className={renderButtonSelect("1y")}
        onClick={() => setDateFormat("1y")}
      >
        1y
      </button>
    </div>
  );
};

export default ChartButtons;
