import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header";
import {
  HomeContainer,
  CustomHeading,
  UserNameContainer,
  CustomStyle,
  CustomText,
} from "./styledComponents";
import { apiUrl } from "../../Urls";

class Home extends Component {
  state = {
    userDetails: {},
    isLoding: false,
  };
  componentDidMount() {
    this.fetchUserDetails();
  }

  fetchUserDetails = async () => {
    this.setState({ isLoding: true });
    const token = Cookies.get("jwt_token");
    if (token !== undefined) {
    }
    const requestUrl = `${apiUrl}/`;
    const options = {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(requestUrl, options);
    const data = await response.json();
    const { userDetails } = data;
    this.setState({ userDetails });
  };

  render() {
    const token = Cookies.get("jwt_token");
    if (token === undefined) {
      return <Redirect to="/login/" />;
    }
    const { userDetails } = this.state;
    const { username, name, gender } = userDetails;
    return (
      <>
        <Header />
        <HomeContainer>
          <UserNameContainer>
            <CustomHeading>{username}</CustomHeading>
          </UserNameContainer>
          <CustomText>
            Name: <CustomStyle>{name}</CustomStyle>
          </CustomText>
          <CustomText>
            Gender: <CustomStyle>{gender}</CustomStyle>
          </CustomText>
        </HomeContainer>
      </>
    );
  }
}

export default Home;
