"use client";

"use client";

import { useForm } from "react-hook-form";
import ms from "./InfoUserManageDialog.module.scss";
import { passwordReactHookFormOption } from "@/utils/vaildation/reactHookFormReturnOption/option";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import Selectbox from "@/component/common/Selectbox/Selectbox";
import { SelectChangeEvent } from "@mui/material";
import { genderList, jobList, userAuthList } from "@/datastore/common/common";
import {
  ApiResponse,
  GenderType,
  UserAuthType,
} from "@/types/common/commonType";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitForm from "@/component/common/SubmitForm/SubmitForm";
import Loading from "@/component/common/Loading/Loading";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { ModifyUserRequest } from "@/types/haveSession/dashboard/dashboard/request";
import { Session } from "next-auth";
import { modifyCollectionUser } from "@/utils/haveSession/dashboard/dashboard/action";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function InfoUserManageDialog({ session, setOpen }: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();

  const {
    register,
    getValues,
    setValue,
    control,
    setError,
    handleSubmit,
    watch,
    formState: {
      // isSubmitting: 양식이 현재 제출중인가?
      isSubmitting,
      isSubmitted,
      errors,
    },
  } = useForm<ModifyUserRequest>({
    mode: "all",
    defaultValues: {
      id: session.user.id,
      password: "",
      authType: session.user.authType,
      job: session.user.job,
      gender: session.user.gender,
      useYn: session.user.useYn,
    },
  });

  const onSubmit = async (data: ModifyUserRequest) => {
    const modifyRequestResponse: ApiResponse<string | null> =
      await modifyCollectionUser(data, session.user.id);
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  return (
    <React.Fragment>
      <Loading
        text="변경한 개인정보 정보를 제출하고 있습니다."
        open={isSubmitting}
      />
      <div className={ms.wrap}>
        <div className={ms.section}>
          {/* TOP */}
          <SubmitForm onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={ms.inner}>
              <div className={ms.inp_box}>
                <span className={ms.label}>
                  닉네임 <span className="essential">*</span>
                </span>
                <Input
                  {...register("id", {
                    required: "블소 인게임 닉네임을 입력해주세요.",
                  })}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  aria-invalid={
                    isSubmitted ? (errors.id ? "true" : "false") : undefined
                  }
                  title="닉네임"
                  id="id"
                  partialErrorObj={errors.id}
                />
              </div>
              <div className={ms.inp_box}>
                <span className={ms.label}>(선택) 변경할 비밀번호</span>
                <Input
                  {...register("password", passwordReactHookFormOption(false))}
                  type="password"
                  placeholder="비밀번호를 변경하고 싶다면, 변경할 비밀번호를 입력해주세요."
                  aria-invalid={
                    isSubmitted
                      ? errors.password
                        ? "true"
                        : "false"
                      : undefined
                  }
                  title="비밀번호"
                  id="password"
                  partialErrorObj={errors.password}
                />
              </div>

              <div className={ms.flexbox}>
                <div className={ms.inp_box}>
                  <span className={ms.label}>
                    성별 <span className="essential">*</span>
                  </span>
                  <Selectbox
                    {...register("gender", {
                      required: "성별을 선택해주세요.",
                    })}
                    items={genderList}
                    placeholder="성별 선택"
                    title="성별 선택"
                    color="white"
                    size="md"
                    onChange={function (event: SelectChangeEvent): void {
                      const targetValue = event.target.value as GenderType;
                      setValue("gender", targetValue, {
                        shouldValidate: true,
                      });
                    }}
                    value={watch("gender")}
                  />
                </div>

                <div className={ms.inp_box}>
                  <span className={ms.label}>
                    직업 <span className="essential">*</span>
                  </span>
                  <Selectbox
                    {...register("job", {
                      required: "인게임 직업을 선택해주세요.",
                    })}
                    items={jobList}
                    placeholder="직업 선택"
                    title="직업 선택"
                    color="white"
                    size="md"
                    onChange={function (event: SelectChangeEvent): void {
                      const targetValue = event.target.value;
                      setValue("job", targetValue, {
                        shouldValidate: true,
                      });
                    }}
                    value={watch("job")}
                  />
                </div>
              </div>

              <div className={ms.inp_box}>
                <span className={ms.label}>
                  문파 권한 <span className="essential">*</span>
                </span>
                <Selectbox
                  {...register("authType", {
                    required: "문파 내 권한을 선택해주세요.",
                  })}
                  items={userAuthList}
                  placeholder="권한 선택"
                  title="권한 선택"
                  color="white"
                  size="md"
                  onChange={function (event: SelectChangeEvent): void {
                    const targetValue = event.target.value as UserAuthType;
                    setValue("authType", targetValue, {
                      shouldValidate: true,
                    });
                  }}
                  value={watch("authType")}
                />
              </div>

              <div className={ms.btn_box}>
                <Button
                  color={"blue"}
                  title={"수정"}
                  id={"modifiy"}
                  size="lg"
                  type="submit"
                  disabled={isSubmitting ? true : false}
                  onClick={(e) => {}}
                >
                  수정
                </Button>
              </div>
            </div>
          </SubmitForm>
        </div>
      </div>
    </React.Fragment>
  );
}