export const getDate = () => {
    const currentDate = new Date();
    const formattedMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${formattedMonth}-${formattedDay}-${currentDate.getFullYear()}`;
    const dateCheck = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`;

    return { formattedDate, dateCheck };
  };
