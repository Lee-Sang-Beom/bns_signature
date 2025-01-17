"use client";

import { UserResponse } from "@/types/haveSession/dashboard/org/response";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import ms from "./Org.module.scss";
import { userAuthList } from "@/datastore/common/common";
import Dialog from "@/component/common/Dialog/Dialog";
import LoginApprovalDialog from "./LoginApprovalDialog";
interface IProps {
  session: Session;
  userList: UserResponse[];
}

export function OrgRightTabClient({ session, userList }: IProps) {
  const [userCount, setUserCount] = useState<number>(
    userList && userList.length > 0 ? userList.length : 0
  );

  const [open, setOpen] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<UserResponse | null>(null);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={ms.inner}>
      {userCount > 0 ? (
        <div className={ms.card_box}>
          {userList.map((user) => {
            const authName = userAuthList.find(
              (auth) => user.authType === auth.value
            )!.name;
            return (
              <button
                className={ms.card}
                key={user.id}
                onClick={() => {
                  setSelectUser(user);
                  setOpen(true);
                }}
              >
                <p>
                  <span className={ms.key}>닉네임</span>
                  <span className={ms.value}>{user.id}</span>
                </p>
                <p>
                  <span className={ms.key}>성별</span>
                  <span className={ms.value}>
                    {user.gender === "MALE" ? "남" : "여"}
                  </span>
                </p>
                <p>
                  <span className={ms.key}>생년월일</span>
                  <span className={ms.value}>{user.userBirth}</span>
                </p>
                <p>
                  <span className={ms.key}>직업</span>
                  <span className={ms.value}>{user.job}</span>
                </p>
                <p>
                  <span className={ms.key}>요청 권한</span>
                  <span className={ms.value}>{authName}</span>
                </p>
              </button>
            );
          })}
        </div>
      ) : (
        <div className={ms.no_user}>
          <img src="/img/no_user.jpg" alt="농담곰 슬픈이미지" />
          로그인 승인을 기다리는 유저가 없습니다.
        </div>
      )}
      {/* 분배 정보 수정 */}
      {selectUser && (
        <Dialog
          type="alert"
          width="sm"
          open={open}
          setOpen={setOpen}
          title={"승인 관리"}
          ref={ref}
          paperHidden={true}
        >
          <LoginApprovalDialog
            session={session}
            setOpen={setOpen}
            data={selectUser}
          />
        </Dialog>
      )}
    </div>
  );
}
