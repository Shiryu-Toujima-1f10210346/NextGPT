import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

function MyComponent() {
  const [value, setValue] = useLocalStorage("myKey", "defaultValue");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      // ローカルストレージの値をセットする際にsetValueを使用
      setValue(value);
    }
  }, [value, isClient]);

  const handleClick = () => {
    // ボタンクリック時にsetValueを使用してローカルストレージの値を変更
    setValue("newValue");
  };

  return (
    <div>
      <p>localStorageの値: {value}</p>
      <button onClick={handleClick}>値を変更する</button>
    </div>
  );
}

export default MyComponent;
