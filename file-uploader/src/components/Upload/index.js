import { useState } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import ReactFileReader from "react-file-reader";
import Header from "../Header";

import {
  Container,
  ViewDataButton,
  UploadDetailsContainer,
  UploadButton,
  ViewDataUploadDetailsContainer,
  CustomText,
  CustomListItem,
  CustomStyle,
  ErrorMsg,
} from "./styledComponents";
import { apiUrl } from "../../Urls";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isValidFileType, setIsValidFileType] = useState(true);
  const [isValidFileSize, setIsValidFileSize] = useState(true);
  const [viewData, setViewData] = useState(false);

  const localFile = localStorage.getItem("localFile");
  if (localFile !== null) {
    setSelectedFile(localFile);
  }

  const onChangeFile = async (files) => {
    if (files[0].type === "application/json") {
      setIsValidFileType(true);
      if (files[0].size > 50000 || files[0].size <= 0) {
        setIsValidFileSize(false);
      } else {
        const fileReader = new FileReader();
        fileReader.onload = async (event) => {
          const token = Cookies.get("jwt_token");
          const fileData = JSON.parse(event.target.result);
          const url = `${apiUrl}/upload/`;
          const options = {
            method: "POST",
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(fileData, null, 2),
          };
          const response = await fetch(url, options);
          const data = await response.json();
          setSelectedFile(JSON.parse(data.file_data));
          setIsValidFileType(true);
          setIsValidFileSize(true);
        };
        fileReader.readAsText(files[0]);
      }
    } else {
      setIsValidFileType(false);
    }
  };

  console.log();

  const renderUploadDetailsContainer = () => (
    <UploadDetailsContainer>
      {selectedFile.map((eachItem) => (
        <CustomListItem key={eachItem.id}>
          <CustomText>
            <CustomStyle>USER ID : </CustomStyle>
            {eachItem.userId}
          </CustomText>
          <CustomText>
            <CustomStyle>TITLE : </CustomStyle>
            {eachItem.title}
          </CustomText>
          <CustomText>
            <CustomStyle>BODY : </CustomStyle>
            {eachItem.body}
          </CustomText>
        </CustomListItem>
      ))}
    </UploadDetailsContainer>
  );

  const token = Cookies.get("jwt_token");
  if (token === undefined) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Header />
      <Container>
      <CustomText>Click on Upload to select file</CustomText>
        <ReactFileReader handleFiles={onChangeFile} fileTypes={".json"}>
          <UploadButton className="btn">Upload</UploadButton>
          {!isValidFileType && (
            <ErrorMsg>*Upload files with .json extension</ErrorMsg>
          )}
          {!isValidFileSize && (
            <ErrorMsg>*Upload files less than 50KB</ErrorMsg>
          )}
        </ReactFileReader>
        <ViewDataUploadDetailsContainer>
          <ViewDataButton type="button" onClick={() => setViewData(!viewData)}>
            View Data
          </ViewDataButton>
          {viewData &&
            isValidFileType &&
            selectedFile !== null &&
            renderUploadDetailsContainer()}
        </ViewDataUploadDetailsContainer>
      </Container>
    </>
  );
};

export default Upload;
