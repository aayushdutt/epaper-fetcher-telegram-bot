const getTimeString = () => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`;
  return time;
};

const appendTimeString = (...txt) => {
  return `${getTimeString()} - ${txt.join(" ")}`;
};

const log = (...txt) => {
  console.log(appendTimeString(...txt));
};

module.exports = { getTimeString, appendTimeString, log };
