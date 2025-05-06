import React from "react";

export function UseSnackbar() {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [type, setType] = React.useState("sucess");

  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 5000);
    }
  }, [isActive]);

  const openSnackBar = (msg = "Something went wrong...", type) => {
    setMessage(msg);
    setIsActive(true);
    setType(type);
  };

  return { isActive, message, type, openSnackBar };
}
