import { Box, IconButton, CircularProgress, Typography } from "@mui/material";
import {useState} from "react";

function Counter({ quantity, onIncrement, onDecrement }) {

  
  const [loadingAction, setLoadingAction] = useState(null);

  const handleIncrement = async () => {
    setLoadingAction("inc");
    await Promise.resolve(onIncrement());
    setLoadingAction(null);
  };

  const handleDecrement = async () => {
    setLoadingAction("dec");
    await Promise.resolve(onDecrement());
    setLoadingAction(null);
  };

  function Alertuser() {
    return ReactDOM.createPortal(
      <Warning setShowWarning={setShowWarning} />,
      document.getElementById("popup")
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        border: "1px solid #ddd",
        borderRadius: "999px",
        px: 1,
        py: 0.5,
        width: "fit-content",
      }}
    >
      <IconButton
        size="small"
        onClick={handleDecrement}
        disabled={loadingAction !== null}
      >
        -
      </IconButton>

      {loadingAction ? (
        <CircularProgress size={20} />
      ) : (
        <Typography
          variant="body1"
          sx={{ minWidth: "24px", textAlign: "center" }}
        >
          {quantity}
        </Typography>
      )}

      <IconButton
        size="small"
        onClick={handleIncrement}
        disabled={loadingAction !== null}
      >
        +
      </IconButton>
    </Box>
  );
}

  /*// Warning component
  function Warning({ setShowWarning }) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "30px",
          border: "2px solid red",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        <Typography variant="h5">
          Don't go further, there may be exceptions ahead!!
        </Typography>

        <Button
          variant="contained"
          onClick={() => setShowWarning(false)}
          sx={{ marginTop: "20px" }}
        >
          Ok
        </Button>
      </div>
    );
  }

  // Increment
  const handleIncrement = () => {
    incrementCount();
  };

  // Decrement
  const handleDecrement = () => {
    decrementCount();
  };

  // Mounted
  useEffect(() => {
    console.log("counter mounted");
  }, []);

  // Count update
  useEffect(() => {
    console.log("counter updated");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    if (count > 4) {
      setShowWarning(true);
    }
  }, [count]);

  // Unmounted
  useEffect(() => {
    return () => {
      console.log("counter unmounted");
    };
  }, []);

  if (count > 5) {
    return (
      <Typography color="error" variant="h4">
        Something went wrong
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        margin: "50px"
      }}
    >
      <Button onClick={handleDecrement} variant="contained">
        Decrement
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Typography variant="h5">{count}</Typography>
      )}

      {showWarning && <Alertuser />}

      <Button variant="contained" onClick={handleIncrement}>
        Increment
      </Button>
    </Box>
  );
}*/

export default Counter;