import React, { useEffect } from "react";
import UploadProperty1 from "../../components/UploadProperty/UploadProperty1/UploadProperty1";
import UploadProperty2 from "../../components/UploadProperty/UploadProperty2/UploadProperty2";
// import UploadProperty3 from "../../components/UploadProperty/UploadProperty3/UploadProperty3";
import { useLogin } from "../../context/LogInProvider/LogInProvider";
import UploadPropertyNav from "../../components/UploadProperty/UploadPropertyNav/UploadPropertyNav";

function UploadProperty() {
  const { firstScreenIsComplete } = useLogin();

  useEffect(() => {}, [firstScreenIsComplete]);

  return (
    <>
      <UploadPropertyNav />
      {!firstScreenIsComplete ? <UploadProperty1 /> : <UploadProperty2 />}
    </>
  );
}

export default UploadProperty;
