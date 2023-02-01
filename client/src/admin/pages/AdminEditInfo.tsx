import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';
import { ChangeEvent, useEffect, useState } from 'react';
import api from '../../RefreshToken';

export const PageWrapper = styled.div`
  width: calc(100% - 240px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  width: 100%;
  color: #006954;
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 1;
`;
const InfoWrapper = styled.div`
  background-color: #eceee2;
  padding: 1.43rem 1.43rem 1.63rem;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  color: #333;
  gap: 16px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  label {
    margin-bottom: 4px;
    font-weight: 500;
    color: #4b4b4b;
    width: 15%;
  }

  input {
    width: 40%;
    border-radius: 12px;
    border: 1px solid #ddd;
    padding: 8px 16px;
    margin-top: 4px;
    margin-right: 4px;
    resize: none;
    overflow: auto;
    ::placeholder {
      color: #828282;
      font-size: 0.85rem;
    }
    &:focus {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      outline: none;
    }
  }

  .newPasswordValidated,
  .match {
    font-size: 14px;
    color: #008d4b;
  }
  .newPasswordError,
  .matchError {
    font-size: 14px;
    color: #b33a3a;
  }
`;

const Button = styled.button`
  width: 40%;
  height: 3em;
  margin: 16px auto 0 15%;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  border: 0;
  transition: all 0.2s;
  background: #009779;
  color: #fff;
  cursor: pointer;
  :hover,
  :active {
    background: #0d8b72;
  }
`;

interface updateInfoType {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const AdminEditInfo = () => {
  const [email, setEmail] = useState('');
  const [memberId, setMemberId] = useState(0);
  const getUserInfo = async () => {
    try {
      const response = await api.get('/api/members/look-up');
      setEmail(response.data.data.email);
      setMemberId(response.data.data.memberId);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const regexPassword = new RegExp(
    /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
    'g',
  );

  const patchEditInfo = async () => {
    try {
      const reqBody: updateInfoType = {
        password,
        newPassword,
        confirmNewPassword,
      };
      await api.patch(`/api/members/edit/${memberId}`, reqBody);
      alert('회원정보 수정이 완료되었습니다.');
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const updateInfoHandler = () => {
    if (!(password && newPassword && confirmNewPassword)) {
      alert(
        '현재 비밀번호, 변경할 비밀번호, 비밀번호 확인을 모두 입력해주세요.',
      );
    } else if (memberId === 8) {
      alert('프로젝트 접근용 계정의 비밀번호를 변경할 수 없습니다.');
    } else {
      patchEditInfo();
    }
  };

  return (
    <form>
      <ContentWrapper>
        <Sidebar />
        <PageWrapper>
          <Title>관리자 정보 변경</Title>
          <InfoWrapper>
            <div>
              <label htmlFor='id'>아이디(이메일)</label>
              <div id='id'>{email}</div>
            </div>
            <div>
              <label htmlFor='pw'>비밀번호</label>
              <input
                type='password'
                id='pw'
                placeholder='기존 비밀번호를 입력해주세요'
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              ></input>
            </div>
            <div>
              <label htmlFor='newpw'>새 비밀번호</label>
              <input
                type='password'
                id='newpw'
                placeholder='영문,숫자,특수문자 포함 8자리 이상'
                value={newPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setNewPassword(e.target.value)
                }
              ></input>
              {newPassword === '' ? null : !regexPassword.test(newPassword) ? (
                <div className='newPasswordError'>
                  영문,숫자,특수문자 포함 8자리 이상으로 입력해주세요.
                </div>
              ) : (
                <div className='newPasswordValidated'>
                  올바른 비밀번호 형식입니다.
                </div>
              )}
            </div>
            <div>
              <label htmlFor='confirmpw'>새 비밀번호 확인</label>
              <input
                type='password'
                id='confirmpw'
                placeholder='새 비밀번호를 한 번 더 입력해주세요'
                value={confirmNewPassword}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setConfirmNewPassword(e.target.value)
                }
              ></input>
              {confirmNewPassword ? (
                newPassword === confirmNewPassword ? (
                  <div className='match'>비밀번호가 일치합니다.</div>
                ) : (
                  <div className='matchError'>
                    비밀번호가 일치하지 않습니다.
                  </div>
                )
              ) : null}
            </div>
            <Button type='button' onClick={updateInfoHandler}>
              비밀번호 수정
            </Button>
          </InfoWrapper>
        </PageWrapper>
      </ContentWrapper>
    </form>
  );
};

export default AdminEditInfo;
