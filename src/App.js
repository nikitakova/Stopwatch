import React from "react";
import classNames from "classnames";
import {
  Button,
  makeStyles,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import StartIcon from "@material-ui/icons/AlarmOn";
import StopIcon from "@material-ui/icons/Stop";
import ResetIcon from "@material-ui/icons/Restore";

import "./App.scss";

const useAppStyles = makeStyles((theme) => ({
  page: {
    height: "100vh",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  stopWatch: {
    width: 580,
  },
  stopWatchHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stopWatchItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 150,
    height: 150,
    backgroundColor: "#4db6ac",
    borderRadius: 5,

    "& h6": {
      color: "#fff",
      fontSize: 20,
      fontWeight: 700,
    },
  },

  stopWatchItemColon: {
    fontSize: 20,
    fontWeight: 700,
  },

  stopWatchFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& button": {
      margin: "40px 5px 0 5px",
    },
  },
  w700: {
    width: 700,
  },
}));

const StopWatchButton = withStyles({
  root: {
    width: 200,
    boxShadow: "none",

    color: "#4db6ac",
    fontSize: 20,

    transition: "background-color 0.1s ease-in-out",

    "&.button--green": {
      border: "3px solid #4db6ac",
      color: "#4db6ac",

      "&:hover": {
        borderColor: "#009688",
        backgroundColor: "#e0f2f1",

        "& h6": {
          color: "#009688",
        },
      },
      "&:active": {
        backgroundColor: "#b2dfdb",
      },
    },
    "&.button--orange": {
      border: "3px solid #ff9800",
      color: "#ff9800",

      "&:hover": {
        borderColor: "#f57c00",
        backgroundColor: "#ffe0b2",

        "& h6": {
          color: "#f57c00",
        },
      },
      "&:active": {
        backgroundColor: "#ffe082",
      },
    },

    "&.button--red": {
      border: "3px solid #e53935",
      color: "#b71c1c",

      "&:hover": {
        borderColor: "#b71c1c",
        backgroundColor: "#ffcdd2",

        "& h6": {
          color: "#b71c1c",
        },
      },
      "&:active": {
        backgroundColor: "#ef9a9a",
      },
    },
  },
})(Button);

function App() {
  const classes = useAppStyles();
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [mSeconds, setMSeconds] = React.useState(0);
  const [isTimerWorking, setIsTimerWorking] = React.useState(false);
  const [isTimerStopping, setIsTimerStopping] = React.useState(false);
  const [timerId, setTimerId] = React.useState(null);

  const stopWatchStyle = classNames({
    [classes.stopWatch]: hours === 0,
    [classes.w700]: hours > 0,
  });

  if (mSeconds === 100) {
    setSeconds((prev) => prev + 1);
    setMSeconds(0);
  } else if (seconds === 60) {
    setMinutes((prev) => prev + 1);
    setSeconds(0);
    setMSeconds(0);
  } else if (minutes === 60) {
    setHours((prev) => prev + 1);
    setMinutes(0);
    setSeconds(0);
    setMSeconds(0);
  }

  const onClearInterval = (id) => {
    clearInterval(id);
    setTimerId(null);
  };

  const onStart = () => {
    const timerId = setInterval(() => setMSeconds((prev) => prev + 1), 10);
    setIsTimerWorking(true);
    setTimerId(timerId);
  };

  const onStop = () => {
    setIsTimerStopping(true);
    onClearInterval(timerId);
  };

  const onReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMSeconds(0);
    setIsTimerWorking(false);
    onClearInterval(timerId);
    setIsTimerStopping(false);
  };

  const isSingleDigitNumber = (number) => (number < 10 ? "0" + number : number);

  return (
    <div className={classes.page}>
      <div className={stopWatchStyle}>
        <div className={classes.stopWatchHeader}>
          {hours > 0 && (
            <>
              <Paper className={classes.stopWatchItem}>
                <Typography variant="h6">
                  {isSingleDigitNumber(hours)}
                </Typography>
              </Paper>
              <span className={classes.stopWatchItemColon}>:</span>
            </>
          )}
          <Paper className={classes.stopWatchItem}>
            <Typography variant="h6">{isSingleDigitNumber(minutes)}</Typography>
          </Paper>
          <span className={classes.stopWatchItemColon}>:</span>
          <Paper className={classes.stopWatchItem}>
            <Typography variant="h6">{isSingleDigitNumber(seconds)}</Typography>
          </Paper>
          <span className={classes.stopWatchItemColon}>:</span>
          <Paper className={classes.stopWatchItem}>
            <Typography variant="h6">
              {isSingleDigitNumber(mSeconds)}
            </Typography>
          </Paper>
        </div>
        <div className={classes.stopWatchFooter}>
          {!isTimerWorking && (
            <StopWatchButton
              className="button--green"
              variant="outlined"
              startIcon={<StartIcon />}
              onClick={onStart}
            >
              Start
            </StopWatchButton>
          )}
          {isTimerWorking && (
            <>
              {isTimerStopping ? (
                <StopWatchButton
                  className="button--green"
                  variant="outlined"
                  startIcon={<StartIcon />}
                  onClick={() => {
                    onStart();
                    setIsTimerStopping(false);
                  }}
                >
                  Resume
                </StopWatchButton>
              ) : (
                <StopWatchButton
                  className="button--red"
                  variant="outlined"
                  startIcon={<StopIcon />}
                  onClick={onStop}
                >
                  Stop
                </StopWatchButton>
              )}

              <StopWatchButton
                className="button--orange"
                variant="outlined"
                startIcon={<ResetIcon />}
                onClick={onReset}
              >
                Reset
              </StopWatchButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
