import React, { useState, useEffect } from "react";

const useSingleSpace = (value: string) => {
  const [trimmedValue, setTrimmedValue] = useState(value);

  useEffect(() => {
    const newValue = value.trim().replace(/\s{2,}/g, " "); // Replace multiple spaces with single spaces
    setTrimmedValue(newValue);
  }, [value]);

  return trimmedValue;
};

export default useSingleSpace;
