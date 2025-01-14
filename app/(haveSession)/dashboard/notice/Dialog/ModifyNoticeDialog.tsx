"use client";
import { useForm } from "react-hook-form";
import ms from "./NoticeDialog.module.scss";
import Input from "@/component/common/Input/Input";
import Button from "@/component/common/Button/Button";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Loading from "@/component/common/Loading/Loading";
import { useAutoAlert } from "@/hooks/common/alert/useAutoAlert";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Timestamp } from "firebase/firestore";
import {
  NoticeFormRegisterRequest,
  NoticeResponse,
} from "@/types/haveSession/dashboard/notice/request";
import EditorComponent from "@/component/common/EditorComponent/EditorComponent";
import _ from "lodash";
import {
  addCollectionNotice,
  modifyCollectionNotice,
} from "@/utils/haveSession/dashboard/notice/action";
import { compressContentImages, compressImages } from "@/utils/common/common";

interface IProps {
  session: Session;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: NoticeResponse;
}

export default function ModifyNoticeDialog({ session, setOpen, data }: IProps) {
  const { setIsChange, setStatus, setText } = useAutoAlert();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [regData, setRegData] = useState<NoticeFormRegisterRequest>({
    title: data.title,
    content: data.content,
    writerId: session.user.id,
    regDt: data.regDt,
  });

  const onSubmit = async () => {
    // CKEditor에서 가져온 데이터를 기반으로 이미지 압축
    const contentWithCompressedImages = await compressContentImages(
      regData.content
    );

    const postData: NoticeFormRegisterRequest = {
      ...regData,
      content: contentWithCompressedImages, // 압축된 데이터 저장
      regDt: Timestamp.fromDate(new Date()),
    };

    await modifyCollectionNotice(data.docId, postData)
      .then(async (res) => {
        if (!res) {
          setText("공지사항 수정 중 오류가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
          return;
        }
        if (res.success) {
          setText("저장되었습니다.");
          setIsChange(true);
          setStatus("success");

          setTimeout(() => {
            router.refresh();
            setOpen(false);
          }, 500);
        } else {
          setText(res.message || "공지사항 수정 중 오류가 발생했습니다.");
          setIsChange(true);
          setStatus("error");
        }
      })
      .catch((error) => {
        setText("공지사항 수정 중 오류가 발생했습니다.");
        setIsChange(true);
        setStatus("error");
        return;
      });
  };

  const onError = (errors: any) => {
    console.error("errors ", errors);
  };

  return (
    <React.Fragment>
      <Loading text="공지사항 정보를 제출하고 있습니다." open={isLoading} />
      <div className={ms.wrap}>
        <div className={ms.section}>
          <div className={ms.inner}>
            {/* 제목 */}
            <div className={ms.inp_box}>
              <span className={ms.label}>
                제목 <span className="essential">*</span>
              </span>
              <Input
                type="text"
                placeholder="제목을 입력해주세요."
                title="제목"
                id="title"
                inpSize="md"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRegData((prev) => {
                    return {
                      ...prev,
                      title: e.target.value,
                    };
                  });
                }}
                value={regData.title}
              />
            </div>

            {/* 내용 */}
            <div className={ms.inp_box}>
              <span className={ms.label}>
                내용
                <span className="essential">*</span>
              </span>
              <EditorComponent
                content={regData.content ? regData.content : ""}
                onContentChange={(value: string) => {
                  setRegData((prev) => {
                    return {
                      ...prev,
                      content: value,
                    };
                  });
                }}
              />
            </div>

            {/* 부가설명 */}
            <p className={ms.img_desc}>이미지는 기본 800x800으로 저장됩니다.</p>

            <div className={ms.btn_box}>
              <Button
                color={"blue"}
                title={"수정"}
                id={"modify"}
                size="lg"
                type="submit"
                onClick={(e) => {
                  onSubmit();
                }}
              >
                수정
              </Button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}