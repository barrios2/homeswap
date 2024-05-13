import React, { useEffect } from "react";
import UploadProperty3 from "../../components/UploadProperty/UploadProperty3/UploadProperty3";
import UploadProperty1 from "../../components/UploadProperty/UploadProperty1/UploadProperty1";
import { useLogin } from "../../context/LogInProvider/LogInProvider";

function UploadProperty() {
  const { firstScreenIsComplete } = useLogin();

  useEffect(() => {}, [firstScreenIsComplete]);

  return (
    <>{!firstScreenIsComplete ? <UploadProperty1 /> : <UploadProperty3 />}</>
  );
}

export default UploadProperty;
