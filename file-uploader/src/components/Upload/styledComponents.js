import styled from "styled-components";

export const Container = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`;

export const FormContainer = styled.form`
  height: 150px;
  width: 90%;
  border: 2px dashed green;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 60%;
  }
`;

export const InputField = styled.input`
  margin-top: 20px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: normal;
  border-radius: 5px;
`;

export const UploadButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  background-color: #90ff70;
  color: #ffffff;
  font-weight: 700;
`;

export const ViewDataButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  background-color: #9090f0;
  text-align: left;
  color: #ffffff;
  font-weight: 700;
`;

export const ViewDataUploadDetailsContainer = styled.div`
  width: 90%;
  margin-top: 20px;
  @media screen and (min-width: 768px) {
    width: 60%;
  }
`;

export const UploadDetailsContainer = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ErrorMsg = styled.p`
  color: red;
  font-size: 14px;
`;

export const CustomListItem = styled.li`
  border: 2px solid black;
  padding: 10px;
  margin: 5px 0px;
  width: 100%;
`;

export const CustomText = styled.p`
  color: #212121;
  margin: 5px 0px;
  font-size: 14px;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;

export const CustomStyle = styled.span`
  color: #000;
  font-weight: bold;
  font-size: 20px;
  @media screen and (min-width: 768px) {
    font-size: 18px;
  }
`;
