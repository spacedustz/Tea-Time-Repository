package com.server.seb41_main_11.domain.member.controller;

import com.server.seb41_main_11.api.login.validator.OauthValidator;
import com.server.seb41_main_11.domain.common.SingleResponseDto;
import com.server.seb41_main_11.domain.member.constant.Role;
import com.server.seb41_main_11.domain.member.dto.MemberDto;
import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.member.mapper.MemberMapper;
import com.server.seb41_main_11.domain.member.service.MemberService;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.AuthenticationException;
import com.server.seb41_main_11.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    private final MemberMapper memberMapper;

    private final OauthValidator oauthValidator;

    //회원가입
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPostDto){
        if(!memberPostDto.getPassword().equals(memberPostDto.getConfirmPassword())){ //비밀번호와 비밀번호 확인이 같지 않으면
            throw new AuthenticationException(ErrorCode.PASSWORD_MISMATCH); //에러 발생
        }
        Member member = memberService.createMember(memberMapper.memberPostDtoToMember(memberPostDto));
        MemberDto.Response response = memberMapper.memberToMemberResponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //로그인
    @PostMapping("/login")
    public ResponseEntity loginMember(@Valid @RequestBody MemberDto.Login memberLoginDto){
        oauthValidator.validateMemberType(memberLoginDto.getMemberType());
        MemberDto.LoginResponse jwtTokenResponseDto = memberService.login(memberMapper.memberLoginDtoToMember(memberLoginDto));

        return new ResponseEntity<>(
                new SingleResponseDto<>(jwtTokenResponseDto), HttpStatus.OK
        );
    }

    //회원 조회(회원정보 수정 페이지)
    @GetMapping("/{memberId}")
    public ResponseEntity getMember(@PathVariable("memberId") @Positive Long memberId){
        Member member = memberService.findVerifiedMemberByMemberId(memberId);
        MemberDto.MyPageResponse response = memberMapper.memberToMyPageResoponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

////    getLoginMemberId 정상 확인 테스트
//    @GetMapping("/info")
//    public void getMember(HttpServletRequest httpServletRequest){
////        Long Id = memberService.getLoginMemberId(httpServletRequest);
//        System.out.printf("======================================"+ Id + "===========================================");
//    }

    //마이페이지 프로그램 전체 목록 조회

    //회원 수정
    @PatchMapping("/{memberId}")
    public ResponseEntity updateMember(@PathVariable("memberId") @Positive Long memberId,
                                       @Valid @RequestBody MemberDto.Patch memberPatchDto){
        memberPatchDto.updateMemberId(memberId);

        Member preMember = memberService.findVerifiedMemberByMemberId(memberId); //멤버 조회

        if(!memberPatchDto.getNewPassword().equals(memberPatchDto.getConfirmNewPassword())){
            throw new EntityNotFoundException(ErrorCode.PASSWORD_MISMATCH); //새 비밀번호와 비밀번호 확인이 같지 않을 경우 예외 처리
        }

        if(preMember.getRole()!= Role.ADMIN) {
            String password = memberService.decryptPassword(preMember.getPassword()); //기존 비밀번호 복호화

            if (!password.equals(memberPatchDto.getPassword())) {
                throw new AuthenticationException(ErrorCode.WRONG_PASSWROD); //기존 비밀번호와 현재 비밀번호가 일치 하지 않으면 예외처리
            }
        }else{
            if(!preMember.getPassword().equals(memberPatchDto.getPassword())){
                throw new AuthenticationException(ErrorCode.WRONG_PASSWROD);
            }
        }


        Member member = memberService.updateMember(memberMapper.memberPatchDtoToMember(memberPatchDto));
        MemberDto.MyPageResponse response = memberMapper.memberToMyPageResoponse(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @DeleteMapping("/{memberId}")
    public ResponseEntity deleteMember(@PathVariable("memberId") @Positive Long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
