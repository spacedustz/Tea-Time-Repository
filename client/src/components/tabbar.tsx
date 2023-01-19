import styled from 'styled-components';
import {
  FaListAlt,
  FaSyringe,
  FaRegLaughSquint,
  FaRegFileAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Box = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 5px 15px 3px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 70px;
  background-color: white;
  z-index: 10;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const CenterIcon = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #b3d2b0;
  /* outline: 6px solid white; */
  object-fit: scale-down;
  margin-bottom: 60px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #777777;
  font-size: 10px;
  cursor: pointer;
  * {
    margin: 3px;
  }
  &:hover {
    color: #71ab75;
    * {
      fill: #71ab75;
    }
  }
`;

const CenterIconImage = styled.img`
  max-height: 70%;
  max-width: 70%;
  padding-right: 8%;
  padding-bottom: 5%;
  transition: 0.3s;
  &:hover {
    max-height: 80%;
    max-width: 80%;
    transition: 0.3s;
  }
`;

const Tabbar = () => {
  const navigate = useNavigate();
  const toMain = () => {
    navigate('/');
  };
  const toTest = () => {
    navigate('/test');
  };
  const toMyPage = () => {
    navigate('/mypage');
  };
  const toCommunity = () => {
    navigate('/community');
  };

  return (
    <Box>
      <IconWrapper onClick={toMain}>
        <FaListAlt color='#777777' size={30} />
        프로그램
      </IconWrapper>
      <IconWrapper onClick={toTest}>
        <FaSyringe color='#777777' size={30} />
        테스트
      </IconWrapper>
      <CenterIcon onClick={toMyPage}>
        <CenterIconImage src='teacup.png' />
      </CenterIcon>
      <IconWrapper onClick={toCommunity}>
        <FaRegLaughSquint color='#777777' size={30} />
        커뮤니티
      </IconWrapper>
      <IconWrapper>
        <FaRegFileAlt color='#777777' size={30} />
        메뉴 더보기
      </IconWrapper>
    </Box>
  );
};
export default Tabbar;
