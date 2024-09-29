### UMC-7th-YONGCHA-BE

# 서버 실행 방법
```js
yarn
yarn start:dev
```

# API 명세서

### `POST` http://localhost:3000/auth/register (회원가입)

Reqeust

```json
{
    "email": "dydals34403@gmail.com",
    "password": "hihi",
    "passwordCheck": "hihi"
}
```

---


### `POST` http://localhost:3000/auth/login (로그인)

Reqeust

```json
{
    "email": "dydals34403@gmail.com",
    "password": "hihi"
}
```

Response `(Success: 200)`

```json
{
    "refreshToken": "eyJhbGci123OiJIUzI1NiIsInR41235cCI6IkpXVCJ9.e123yJzdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3Mjc2MTM3MjgsImV4cCI6MTcyNzcwMDEyOH0.Ag8Va6NtNhcphunV8bIdFSXifogXEtRD-SzEOrYW0kQ",
    "accessToken": "eyJhbGciOiJI123UzI1NiIsInR5123123cCI6IkpXVCJ9.eyJ123zdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyNzYxMzcyOCwiZXhwIjoxNzI3NjE0MDI4fQ.zSCImG4svIfB_zbAkx8nCAMhy1ReEb4019krPu2cEq4"
}
```

---

### `POST` http://localhost:3000/auth/token/access (refreshToken을 활용한, 토큰 재발급)
## accessToken : 5m 후 만료, refreshToken: 24h 후 만료

request시, 따로 body로 데이터 전송을 안해주어도 되고, 로그인 시 얻는 Refresh 토큰을 헤더에 Bearer 형태로 넘겨주시면 됩니다.
Authorization: Bearer `refreshToken`

유효한 토큰일시 유저 정보를 아래와 같이 전달받습니다.
`(Success: 200)`

```json
{
    "refreshToken": "eyJhbGci123OiJIUzI1NiIsInR41235cCI6IkpXVCJ9.e123yJzdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3Mjc2MTM3MjgsImV4cCI6MTcyNzcwMDEyOH0.Ag8Va6NtNhcphunV8bIdFSXifogXEtRD-SzEOrYW0kQ",
    "accessToken": "eyJhbGciOiJI123UzI1NiIsInR5123123cCI6IkpXVCJ9.eyJ123zdWIiOjIsImVtYWlsIjoiZHlkYWxzMzQ0MDNAZ21haWwuY29tIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTcyNzYxMzcyOCwiZXhwIjoxNzI3NjE0MDI4fQ.zSCImG4svIfB_zbAkx8nCAMhy1ReEb4019krPu2cEq4"
}
```

---

### `GET` http://localhost:3000/user/me (유저 정보 불러오기)

request시, 따로 body로 데이터 전송을 안해주어도 되고, 로그인 시 얻는 access 토큰을 헤더에 Bearer 형태로 넘겨주시면 됩니다.
Authorization: Bearer `accessToken`

유효한 토큰일시 유저 정보를 아래와 같이 전달받습니다.
`(Success: 200)`

```json
{
    "id": 1,
    "email": "dydals34402@gmail.com"
}
```
