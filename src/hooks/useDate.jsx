function useDate() {
  function getYearAndMonth() {
    const todaysDate = new Date();
    const todaysMonth = "0" + (todaysDate.getMonth() + 1);
    const todaysYear = todaysDate.getFullYear();
    return todaysYear + "-" + todaysMonth;
  }
  function getTodaysDate() {
    return new Date();
  }
  return { getYearAndMonth, getTodaysDate };
}

export default useDate;
