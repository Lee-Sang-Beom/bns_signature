"use client";

import { NoticeResponse } from "@/types/haveSession/dashboard/notice/request";
import ms from "./NoticeDetail.module.scss";
import TableDetail from "@/component/common/TableDetail/TableDetail";
import { useRef, useState } from "react";
import { Session } from "next-auth";
import Button from "@/component/common/Button/Button";
import Dialog from "@/component/common/Dialog/Dialog";
import ModifyNoticeDialog from "../Dialog/ModifyNoticeDialog";
import { useRouter } from "next/navigation";
interface IProps {
  data: NoticeResponse;
  session: Session;
}
export default function NoticeDetailClient({ session, data }: IProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [selectNotice, setSelectNotice] = useState<NoticeResponse | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const router = useRouter();
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={ms.wrap}>
      {/* 공지사항 수정 */}
      {selectNotice && (
        <Dialog
          width="lg"
          open={dialogOpen}
          setOpen={setDialogOpen}
          title="공지사항 수정"
          ref={ref}
          paperHidden={true}
        >
          <ModifyNoticeDialog
            session={session}
            setOpen={setDialogOpen}
            data={selectNotice}
          />
        </Dialog>
      )}

      <TableDetail
        ref={tableRef}
        title={data.title}
        content={data.content}
        writerId={data.writerId}
      >
        <div className={ms.btn_box}>
          {session.user.id === data.writerId ? (
            <Button
              color={"blue_reverse"}
              title={"수정"}
              id={"modifiy"}
              onClick={(e) => {
                setSelectNotice(data);
                setDialogOpen(true);
              }}
            >
              수정
            </Button>
          ) : (
            <></>
          )}
          <Button
            color={"white"}
            title={"목록으로"}
            id={"move_list_page"}
            onClick={() => {
              router.push("/dashboard/notice");
            }}
          >
            목록으로
          </Button>
        </div>
      </TableDetail>
    </div>
  );
}
