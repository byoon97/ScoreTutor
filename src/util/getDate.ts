export const getDate = () => {
    const currentDate = new Date();
    const formattedMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const formattedDay = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${formattedMonth}-${formattedDay}-${currentDate.getFullYear()}`;
    const dateCheck = `${currentDate.getFullYear()}-${formattedMonth}-${formattedDay}`;

    return { formattedDate, dateCheck };
  };

  export function convertToEST(dateTime: string): string {
    // Create a Date object from the input date-time string
    const date = new Date(dateTime);
  
    // Options for formatting the date and time to DD-MM-YYYY HH:MM:SS AM/PM in EST
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/New_York', // EST time zone
      hour12: true // 12-hour format with AM/PM
    };
  
    // Format the date using Intl.DateTimeFormat
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDateParts = formatter.formatToParts(date);
  
    // Extract the relevant parts for DD-MM-YYYY format
    const day = formattedDateParts.find(part => part.type === 'day')?.value;
    const month = formattedDateParts.find(part => part.type === 'month')?.value;
    const year = formattedDateParts.find(part => part.type === 'year')?.value;
    const hour = formattedDateParts.find(part => part.type === 'hour')?.value;
    const minute = formattedDateParts.find(part => part.type === 'minute')?.value;
    const second = formattedDateParts.find(part => part.type === 'second')?.value;
    const period = formattedDateParts.find(part => part.type === 'dayPeriod')?.value;
  
    // Combine the parts into the desired format
    const formattedDate = `${month}-${day}-${year}`;
    const formattedTime = `${hour}:${minute}:${second} ${period}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
  
    return formattedDateTime;
  }

  export function extractDateTime(input: string): string {
    // Split the string by the delimiter " - " and get the last part
    const parts = input.split(" - ");
    return parts[parts.length - 1];
  }
  
