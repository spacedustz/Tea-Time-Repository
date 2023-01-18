package com.server.seb41_main_11.domain.pay.service;

import com.server.seb41_main_11.domain.member.entity.Member;
import com.server.seb41_main_11.domain.pay.entity.Pay;
import com.server.seb41_main_11.domain.pay.repository.PayRepository;
import com.server.seb41_main_11.domain.program.entity.Program;
import com.server.seb41_main_11.domain.program.service.ProgramService;
import com.server.seb41_main_11.global.error.ErrorCode;
import com.server.seb41_main_11.global.error.exception.BusinessException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PayService {
    private final PayRepository payRepository;
    private final ProgramService programService;

    public Pay createPay(Pay pay, Long programId, Member member) {
        Program program = programService.findVerifiedExistsReserveProgram(
            programId, member.getMemberId());

        pay.setMember(member);
        pay.setProgram(program);

        return payRepository.save(pay);
    }

    @Transactional(readOnly = true)
    public Pay findReservation(Long payId) {
        Pay findPay = findVerifiedPay(payId);
        return findPay;
    }

    public Pay findVerifiedPay(Long payId) {
        Optional<Pay> optionalPay = payRepository.findById(payId);
        Pay findPay = optionalPay.orElseThrow(
            () -> new BusinessException(ErrorCode.RESERVATION_NOT_FOUND)
        );

        return findPay;
    }

    @Transactional(readOnly = true)
    public Page<Pay> searchMyReserveProgram(Long memberId, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("createdAt").descending());

        List<Pay> searchResult = payRepository.findAllByMember(memberId);

        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchResult.size());
        Page<Pay> pays = new PageImpl<>(searchResult.subList(start, end), pageRequest, searchResult.size());

        return pays;
    }
}