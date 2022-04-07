import React from "react";
import Alert from "react-bootstrap/Alert";
import "./AlertMessage.scss";
import WarningIcon from "@material-ui/icons/Warning";
import DoneIcon from "@material-ui/icons/Done";
const AlertMessage = ({ info }) => {
  return info === null ? null : (
    <Alert variant={info.type} className='AlertMessage'>
      {info.type === "success" ? (
        <div className='success'>
          <DoneIcon />
          <span>{info.message}</span>
        </div>
      ) : (
        <div className='error'>
          <WarningIcon />
          <span>{info.message}</span>
        </div>
      )}
    </Alert>
  );
};

export default AlertMessage;
