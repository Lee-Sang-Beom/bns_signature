# bns_guild_mng

## 프로젝트 개요

**bns_guild_mng**는 문파 활동 과정에서 문파원들이 필요로 하는 문파 관리 시스템을 반영하고, 이를 효율적으로 처리할 수 있도록 설계한한 웹 애플리케이션입니다.

---

## 주요 기능

### 2025-01-16 v1.0 업데이트

#### 1. 대시보드

- **문파 내 직업 분포 현황**: 문파원의 직업 통계를 한눈에 확인 가능.
- **최근 공지사항**: 최근 등록 또는 수정된 공지사항 3개 표시.
- **최근 분배정보**: 최근 등록 또는 수정된 분배정보 3개 표시.

#### 2. 회원가입

- 입력 정보:
  - 닉네임(아이디)
  - 패스워드
  - 성별
  - 생년월일
  - 직업
  - 문파권한

#### 3. 로그인

- 입력 정보:
  - 닉네임(아이디)
  - 패스워드

#### 4. 개인정보 수정

- 수정 가능 정보:
  - 닉네임(아이디)
  - 패스워드
  - 성별
  - 생년월일
  - 직업
  - 문파권한

#### 5. 분배정보 관리

- 상태 설정:
  - 시장 등록
  - 시장 거래완료
  - 분배 완료
- 시장 거래완료 및 분배 완료 상태에서는 파티원 수에 따른 아이템 인당 분배금 및 우편수수료 자동 계산.

#### 6. 공지사항 관리

- 작성, 수정, 삭제 권한:
  - 관리자 (문파장, 부문파장, 문파장로)만 가능.
  - 관리자 계정은 모든 공지사항을 수정 및 삭제 가능.

---

### 2025-01-17 v1.1 업데이트

#### 1. **회원가입/로그인 Flow 변경**

#### 2. **조직도 메뉴 추가**

- **왼쪽 탭**:
  - 문파원 조회 기능 추가.
  - 회원탈퇴 기능 추가.
- **오른쪽 탭**:
  - 문파원 로그인 승인 기능 추가.

#### 3. **왼쪽 헤더 상단 업데이트 확인 버튼**:

- 업데이트 전용 공지사항 페이지 추가.

---

### 2025-01-18 v1.2 업데이트

#### 1. **비밀번호 찾기**: 사용자 비밀번호 복구 기능 제공.

#### 2.**생년월일 마스킹 처리**:

- 조직도에서 관리자 및 본인을 제외한 다른 문파원의 상세 생년월일은 마스킹 처리.

#### 3.**서브캐릭터 등록**:

- 대표캐릭터(본캐) 하위의 서브캐릭터(부캐)를 추가 가능.

---

### 2025-01-27 v1.3 업데이트

#### 1. **커뮤니티 메뉴 추가**:

- 아트워크, 정보(팁)에 해당하는 게시글 등록 가능.

---

### 2025-02-01 v1.3.1 업데이트

#### 1. **좌측 헤더 로고 이미지 수정**

- 메인 헤더 로고가 생각보다 크게 출력되어, 크기 줄임 처리를 진행.

#### 2.**대시보드 문파 내 직업분포 세분화**:

- 대표캐릭터, 서브캐릭터, 총합 별로 확인 가능.

#### 3.**로딩 다이얼로그 추가**:

- 특정 조작으로 인한 데이터 재요청 시, 현재 화면 위에 로딩 팝업을 추가.
- 기존의 분배금 관리, 공지사항, 커뮤니티 페이지에서는 특정 조작으로 인한 데이터 재요청 시에 데이터를 요청하는 동안 페이지가 멈춘 듯한 불편한 UX가 제공되고 있었기에, UX 고려.

---

### 2025-02-16 v1.3.2 업데이트

#### 1. **일부 페이지 구성요소 접근성 수정**

- 칩(Chip) : 키보드 조작으로 접근 가능하게 수정 및 포커스/호버 이벤트에 따른 스타일이 변경되게 수정.
- 탭(Tab) : 포커스/호버 이벤트에 따른 스타일이 변경되게 수정.

#### 2.**대시보드 출력요소 추가**:

- 커뮤니티, 업데이트 관련 최근 내용을 대시보드에서 확인 가능.

#### 3.**조직도 직업별 문파원 조회 및 관리기능 추가**:

- 권한별 외, 직업별로 문파원을 조회할 수 있는 기능 추가.
- 기존에 권한별 문파원 조회 영역역에서 이용 가능했던 회원탈퇴 및 문파원 상세정보 조회가 그대로 가능.

---

## 문의사항

프로젝트와 관련된 문의사항은 [tkdqja975@naver.com](mailto:tkdqja975@naver.com)으로 연락 부탁드립니다.
