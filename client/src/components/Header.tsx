import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './NavBar';
import SignButtons from './SignButtons';
import MyPageButton from './MyPageButton';

const Contents = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background: #f7f9ed;
  border-bottom: 1px solid #c9d697;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 12px;
  padding: 0 20px;
  z-index: 999999;

  a {
    color: inherit;
    display: block;
  }

  h1 {
    font-size: 1.63rem;
    font-weight: 700;
    color: #b3b3b3;
    height: 100%;

    a {
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    img {
      max-width: 60%;
    }
  }

  @media screen and (min-width: 768px) {
    height: 64px;
    line-height: 64px;

    h1 {
      img {
        max-width: 80%;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    height: 70px;
    line-height: 70px;
    gap: 32px;
    padding: 0 40px;

    h1 {
      img {
        max-width: 100%;
      }
    }
  }
`;

const Header = () => {
  const isLoggedIn = localStorage.getItem('accessToken') ? true : false;
  return (
    <Contents>
      <h1>
        <Link to='/'>
          <img src='/teatime.png' alt='티타임' />
        </Link>
      </h1>
      <NavBar />
      {isLoggedIn ? <MyPageButton /> : <SignButtons />}
    </Contents>
  );
};

export default Header;
