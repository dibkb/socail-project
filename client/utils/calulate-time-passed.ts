export const calulateTime = (mongoTime: string) => {
  // Get the current time
  const currentTime = new Date();
  const targetTime = new Date(mongoTime);
  // Calculate the difference in milliseconds
  const timeDifference = currentTime.getTime() - targetTime.getTime();
  // Convert milliseconds to seconds, minutes, hours, etc.
  const secondsPassed = Math.floor(timeDifference / 1000);
  const minutesPassed = Math.floor(timeDifference / (1000 * 60));
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  // Determine the appropriate unit based on the time passed
  if (daysPassed > 0) {
    return { quantity: daysPassed, unit: "d" };
  } else if (hoursPassed > 0) {
    return { quantity: hoursPassed, unit: "h" };
  } else if (minutesPassed > 0) {
    return { quantity: minutesPassed, unit: "m" };
  } else {
    return { quantity: secondsPassed, unit: "s" };
  }
};
