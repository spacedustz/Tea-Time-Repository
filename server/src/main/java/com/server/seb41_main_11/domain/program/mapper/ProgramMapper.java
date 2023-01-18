package com.server.seb41_main_11.domain.program.mapper;

import com.server.seb41_main_11.domain.program.dto.ProgramDto;
import com.server.seb41_main_11.domain.program.entity.Program;
import java.util.List;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProgramMapper {
    Program ProgramPostDtoToProgram(ProgramDto.Post requestBody);
    Program ProgramPatchDtoToProgram(ProgramDto.Patch requestBody);
    ProgramDto.Response ProgramToProgramResponseDto(Program program);
    List<ProgramDto.PageResponse> ProgramsToProgramResponseDtos(List<Program> programs);
    List<ProgramDto.MyPageProgramResponse> ProgramsToMyProgramResponseDtos(List<Program> programs);
}