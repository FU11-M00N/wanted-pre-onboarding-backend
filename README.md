## 목차<br>

[1.애플리케이션 실행 방법](#애플리케이션-실행-방법)<br>
[2.엔드포인트 호출](#엔드포인트-호출)<br>
[3.데이터베이스 테이블 구조](#데이터베이스-테이블-구조)<br>
[4.API 동작 데모 영상 링크](#api-동작-데모-영상-링크)<br>
[5.구현 방법 및 이유에 대한 설명](#구현-방법-및-이유에-대한-설명)<br>
[6.API 명세](#api-명세)<br>

## 지원자: 문호준

## 애플리케이션 실행 방법

-  준비물 : docker, docker compose

아래는 docker compose를 활용해 애플리케이션 환경 구성을 하는 방법입니다.<br><br>
<u>직접 테스트해 볼 수 있게끔 .env 파일과 .db.env 파일은 레퍼지토리에 공개해 두었습니다.</u>
<br><br>

1. git clone

   ```bash
   $ git clone https://github.com/FU11-M00N/wanted-pre-onboarding-backend.git
   ```

2. Docker Compose 실행

   ```bash
   $ docker compose up -d
   ```

3. Docker Conatiner 상태 확인

   ```bash
   $ docker ps
   ```

   <br>

## 엔드포인트 호출

### 회원가입 api

POST `/api/auth/join`

```bash
curl --location '52.78.43.121:3001/api/auth/join' \
--data-urlencode 'email=test5@test.com' \
--data-urlencode 'password=12345678' \
--data-urlencode '='
```

### 로그인 api

POST `/api/auth/login`

```bash
curl --location '52.78.43.121:3001/api/auth/login' \
--data-urlencode 'email=test2@test.com' \
--data-urlencode 'password=12345678'
```

### 게시글 생성 api

POST `/api/post/`

```bash
curl --location '52.78.43.121:3001/api/post/' \
--header 'authorization: { jwt token }' \
--data-urlencode 'title=테스트21' \
--data-urlencode 'content=테스트21'
```

### 게시글 수정 api

PATCH `/api/post/:id`

```bash
curl --location --request PATCH '52.78.43.121:3001/api/post/:id' \
--header 'authorization: { jwt token }' \
--data-urlencode 'title=게시글 수정 테스트 테스트 테스트' \
--data-urlencode 'content=게시글 수정 테스트'
```

### 게시글 삭제 api

DELETE `/api/post/:id`

```bash
curl --location --request DELETE '52.78.43.121:3001/api/post/:id' \
--header 'authorization: { jwt token }'
```

### 게시글 목록 api

page = 페이지<br>
limit = 페이지에 담길 게시글 개수

GET `/api/post/?page=1&limit=10`

```bash
curl --location '52.78.43.121:3001/api/post/?page=1&limit=10'
```

### 특정 게시글 조회 api

GET `/api/post/:id`

```bash
curl --location '52.78.43.121:3001/api/post/:id'
```

## 데이터베이스 테이블 구조

애플리케이션의 기본적인 구조는 User 테이블과 Post 테이블을 설계하였습니다
<br>User 테이블은 회원가입된 유저의 정보를 보관하며, 상세 정보와 권한 설정을 포함합니다. <br>작성되는 게시글은 Post 테이블을 통해 저장되며, 각 게시글은 고유한 식별자를 갖습니다.

이 두 테이블 간의 관계는 1:N 관계로 설계되었습니다. <br>한 명의 유저는 여러 개의 게시글을 작성할 수 있으며, 각 게시글은 한 명의 유저에 의해 작성됩니다.<br>

테이블 구조 사진 예정

## API 동작 데모 영상 링크

[API 동작 시연 영상 유튜브 링크](https://www.youtube.com/playlist?list=PLHCEHngs9pgEcG_6Dv07T_vEicen_7Xof)

## 구현 방법 및 이유에 대한 설명

작성 중...

## API 명세

| 순번 | HTTP 메서드 | 엔드포인트                  | 설명               |
| ---- | ----------- | --------------------------- | ------------------ |
| 1    | POST        | `/api/auth/join`            | 사용자 회원가입    |
| 2    | POST        | `/api/auth/login`           | 사용자 로그인      |
| 3    | POST        | `/api/post/`                | 새로운 게시글 생성 |
| 4    | GET         | `/api/post?page=1&limit=10` | 게시글 목록 조회   |
| 5    | GET         | `/api/post/:id`             | 특정 게시글 조회   |
| 6    | PATCH       | `/api/post/:id`             | 게시글 수정        |
| 7    | DELETE      | `/api/post/:id`             | 게시글 삭제        |

<br>

### Auth

#### 회원가입

-  Request
   -  Method: `POST`
   -  Request body

```json
{
   "email": "test@test.com",
   "password": "12345678"
}
```

-  Response
   -  회원가입 성공

```html
회원가입 성공
```

-  Response
   -  회원가입 실패(이메일 혹은 패스워드 형식 불일치)

```json
{
   "email": "이메일 형식이 올바르지 않습니다."
}
```

#### 로그인

-  Request
   -  Method: `POST`
   -  Request body

```json
{
   "email": "test@test.com",
   "password": "12345678"
}
```

-  Response
   -  로그인 성공

```json
{
   "code": 200,
   "message": "로그인 성공",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSldUIiwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsInVzZXJJZCI6MywiaWF0IjoxNjkxNTg2OTA3LCJleHAiOjE2OTE1ODc4MDd9.UgRr7VUsYIYESM68gqyLYc-Dnpq4sHcQxNoM3bjipKw"
}
```

-  Response
   -  로그인 실패(이메일 혹은 패스워드 형식 불일치)

```html
존재하지 않는 유저이거나 패스워드가 일치하지 않습니다.
```

<br>

### Post

#### 게시글 생성

-  Request
   -  Method: `POST`
   -  HEADERS: '{jwt token}'
   -  Request body

```json
{
   "title": "제목 작성 테스트",
   "content": "본문 작성 테스트"
}
```

-  Response
   -  게시글 작성 성공

```json
{
   "id": 21,
   "title": "제목 작성 테스트",
   "content": "본문 작성 테스트",
   "UserId": 3,
   "updatedAt": "2023-08-09T13:16:30.243Z",
   "createdAt": "2023-08-09T13:16:30.243Z"
}
```

-  Response
   1. 게시글 생성 실패(게시글 제목 길이 제한)
   2. 게시글 생성 실패(게시글 본문 길이 제한)

(1)

```json
{
   "title": "게시글 제목은 1글자 이상 40글자 이하로 작성해 주시기 바랍니다."
}
```

(2)

```json
{
   "content": "게시글 본문은 150글자 이하로 작성해 주시기 바랍니다."
}
```

#### 게시글 수정

-  Request
   -  Method: `PATCH`
   -  HEADERS: '{jwt token}'
   -  Request body

```json
{
   "title": "제목 수정 테스트",
   "content": "본문 수정 테스트"
}
```

-  Response
   -  게시글 수정 성공

```html
게시글 수정 완료.
```

-  Response
   -  게시글 수정 실패(다른 유저의 게시글 수정 시도 시)

```html
올바른 요청 방식이 아닙니다.
```

#### 게시글 삭제

-  Request

   -  Method: `DELETE`
   -  HEADERS: '{jwt token}'

-  Response
   -  게시글 삭제 성공

```html
게시글 삭제 완료.
```

-  Response
   -  게시글 삭제 실패(다른 유저의 게시글 삭제 시도 시)

```html
올바른 요청 방식이 아닙니다.
```

#### 게시글 목록 조회

-  Request

   -  Method: `GET`
   -  PARAMS: page=1&limit=10

-  Response
   -  특정 게시글 조회 성공

```json
{
   "id": 4,
   "title": "\b테스트4",
   "content": "테스트4",
   "createdAt": "2023-08-09T09:39:11.000Z",
   "User": {
      "id": 1,
      "email": "test@test.com"
   }
}
```

-  Response
   -  특정 게시글 조회 성공(존재하지 않거나 삭제된 게시글을 조회 시)

```html
존재하지 않는 게시글입니다.
```

#### 특정 게시글 조회

-  Request

   -  Method: `GET`
   -  PATH Parameter: :id

-  Response
   -  특정 게시글 조회 성공

```json
{
  "count": 17,
  "rows": [
    {
      "id": 2,
      "title": "게시글 수정 테스트 테스트 테스트",
      "content": "\b게시글 수정 테스트",
      "createdAt": "2023-08-09T09:36:58.000Z",
      "User": {
        "id": 1,
        "email": "test@test.com"
      }
    },
    {
      "id": 4,
      "title": "\b테스트4",
      "content": "테스트4",
      "createdAt": "2023-08-09T09:39:11.000Z",
      "User": {
        "id": 1,
        "email": "test@test.com"
      }
    },
    {
      "id": 5,
      "title": "\b테스트5",
      "content": "테스트5",
      "createdAt": "2023-08-09T09:39:14.000Z",
      "User": {
        "id": 1,
        "email": "test@test.com"
      }
    },
...생략
```

-  Response
   1. 게시글 목록 조회 실패(범위 내 게시글이 존재하지 않을 시)

```html
요청 한 범위 내 게시글이 존재하지 않습니다.
```

<br>
보다 자세한 API 명세와 각 API에 대한 Request, Response 는 아래 링크에서 확인해볼 수 있습니다.
https://documenter.getpostman.com/view/25249897/2s9Xy2PsF2
