export const formatValue = value => {
  const numberValue = parseFloat(value);

  // Check if the value is a valid number
  if (isNaN(numberValue)) {
    return value; // Return the value itself if it's not a number
  }

  // Otherwise, return the value formatted to 3 decimal places
  return `${numberValue.toFixed(3)}g`;
};
