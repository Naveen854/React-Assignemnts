import styled from "styled-components";

export const NavHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid rgb(243, 243, 243);
  @media screen and (max-width: 768px) {
    align-items: center;
    border-bottom-style: none;
  }
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  max-width: 1110px;
  padding-top: 25px;
  padding-bottom: 25px;
  @media screen and (max-width: 768px) {
    width: 80%;
    max-width: 992px;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  list-style-type: none;
  margin-top: 0px;
  margin-bottom: 0px;
`;

export const NavMenuItem = styled.li`
  font-family: "Roboto";
  text-decoration: none;
  margin: 10px;
  font-weight: 400;
  font-size: 16px;
`;

export const LogoutButton = styled.button`
  font-family: "Roboto";
  font-weight: 600;
  font-size: 10px;
  padding: 8px 16px;
  color: #ffffff;
  background-color: #0967d2;
  border: none;
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
  outline: none;
`;
