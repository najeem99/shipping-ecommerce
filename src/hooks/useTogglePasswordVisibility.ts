import { useState } from "react";

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState<boolean>(true);
  
    const handlePasswordVisibility = () => {
        setPasswordVisibility((value) => !value);
    };
  
    return {
      passwordVisibility,
      handlePasswordVisibility,
    };
  };
  