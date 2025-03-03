"use client";
import { useGetRecentCashShareDates } from "@/hooks/dashboard/useGetRecentCashShareDates";
import ms from "./Dashboard.module.scss";
import { CashshareRequest } from "@/types/haveSession/dashboard/cashshare/request";
import clsx from "clsx";
import tms from "@/styles/tableHeader.module.scss";
import { SiDatadog } from "react-icons/si";
import Link from "next/link";
import { makeUrlQuery } from "@/utils/common/common";
import { CashshareResponse } from "@/types/haveSession/dashboard/cashshare/response";
import { getDashboardDateStringAndIsNew } from "@/utils/haveSession/dashboard/dashboard/action";
import { MdOutlineFiberNew } from "react-icons/md";

export default function DisplayCashShareCard() {
  const { data } = useGetRecentCashShareDates();

  return (
    <div className={`${ms.card} ${ms.card_middle}`}>
      {data && data.length > 0 ? (
        <ul>
          <li>
            <span className={`${ms.step} ${ms.header}`}>단계</span>
            <span className={`${ms.sellerId} ${ms.header}`}>판매자</span>
            <span className={`${ms.itemName} ${ms.header}`}>판매 물품</span>
            <span className={`${ms.totalPrice} ${ms.header}`}>판매 수익금</span>
            <span className={`${ms.regDt} ${ms.header}`}>등록일</span>
          </li>
          {data.map((cashData: CashshareResponse) => {
            // 거래단계
            const step = cashData.step;
            const stepValue =
              step === "TRANSACTION_REGISTRATION"
                ? "거래등록"
                : step === "TRANSACTION_COMPLETED"
                ? "거래완료"
                : "분배완료";

            const borderClsx = clsx({
              [tms.table_header_text]: true,
              [tms.red]: stepValue == "거래등록",
              [tms.blue]: stepValue == "거래완료",
              [tms.gray]: stepValue == "분배완료",
            });

            // 아이템 리스트
            const itemListString =
              cashData.itemList.length > 1
                ? `${cashData.itemList[0]} 외 ${cashData.itemList.length - 1}건`
                : `${cashData.itemList[0]}`;

            // 총 가격
            const totalPriceString =
              stepValue != "거래등록"
                ? cashData.totalPrice.toLocaleString() + "금"
                : "미판매";

            // 등록일
            const { dateString, isNew } = getDashboardDateStringAndIsNew(
              cashData.regDt!
            );

            // 링크
            const queryInstance: CashshareRequest = {
              page: 1,
              size: 5,
              sort: "regDt",
              orderBy: "desc",
              stepType: step,
              searchType: "SELLER_ID",
              searchKeyWord: cashData.sellerId,
            };

            return (
              <Link
                key={`${cashData.docId}_link`}
                href={`/dashboard/cashshare?${makeUrlQuery(queryInstance)}`}
              >
                <li>
                  <span className={`${borderClsx} ${ms.step}`}>
                    {stepValue}
                    {isNew && (
                      <MdOutlineFiberNew
                        role="img"
                        aria-label="NEW 문자열 아이콘"
                        color="red"
                        size={24}
                        className={ms.new_ico}
                      />
                    )}
                  </span>
                  <span className={ms.sellerId}>{cashData.sellerId}</span>
                  <span className={ms.itemName}>{itemListString}</span>
                  <span className={ms.totalPrice}>{totalPriceString}</span>
                  <span className={ms.regDt}>{dateString}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p className={ms.no_data}>
          <SiDatadog
            size={28}
            role="img"
            aria-label="사진을 물고있는 개 아이콘"
          />
          등록된 정보가 없습니다.
        </p>
      )}
    </div>
  );
}
