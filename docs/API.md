# API

구현할 API를 설계합니다.

## API 사용해보기 (예정)
[Open API(Swagger)](https://swagger.io/specification/)를 통해 API를 테스트할 수 있도록 도큐먼트를 만들 예정입니다.

이 문서는 API 인터페이스를 토대로 클라이언트 팀에서 작업할 수 있도록 도우는데 초점을 가지고 있습니다.

여기서 기술된 API의 반환값은 최대한 실 API 반환값과 비슷하게 기술하였으나 차이는 존재합니다. 정확한 API의 반환값에 대한 인터페이스는 `src/<기능명>/*.entity.ts` 파일을 참조하시면 편합니다.


## Pagination
반환되는 값이 여러 개인 경우 페이지 처리되어 값이 반환됩니다. 기본 페이지 크기는 `20` 입니다. 최대 `100` 개의 값을 반환할 수 있도록 설계할 예정입니다.

```
[Request]
GET /some/items?page=2&pageSize=50
``` 

퀴리 파라미터로 `page`는 특정 페이지를 지정할 수 있습니다. `pageSize`는 페이지의 크기를 지정합니다. 두 값 모두 숫자여야 합니다.

### Link 헤더
Pagination을 처리하기 위해 `Link` 헤더값을 이용합니다.

```json
{
    "prev": "https://api.loling.me/some/items?page=1",
    "next": "https://api.loling.me/some/items?page=2"
}
```

헤더값은 위 JSON 포맷의 문자열이 반환됩니다. 사용 시에 JSON을 파싱하셔야 합니다.

`prev`는 이전 페이지의 API Url, `next`는 다음 페이지의 API Url 입니다. 만약 이전 혹은 다음 페이지가 없는 경우 `null` 값이 할당되어 있습니다.


## 예외
Http 상태코드가 `2xx`이 아닌 경우, 모든 반환은 예외입니다. 예외 인터페이스는 다음과 같고, JSON 입니다.

```json
{
    "code": "<고유한 예외 코드값>",
    "message": "<사용자 친화적인 예외 메시지>"
} 
```

대부분의 예외는 `4xx`대 코드입니다. 만약 위 인터페이스대로 결과가 반환되지 않거나 `5xx` 오류가 발생하는 경우 **서버 오류** 입니다. 발견 즉시, 리포트 해주시면 모니터링 로그 참고해서 고치겠습니다(...)

## 인증
토큰 방식의 인증을 사용하며, 토큰의 형식은 [Json Web Tokens](https://jwt.io/) 입니다.

### 인증하기
사용자를 인증하기 위해 `Authorization` 헤더값이 토큰값을 넣어 주시기 바랍니다.

```
Authorization: JWT <토큰값>
(e.g.) Authorization: JWT abcdefe232323...qwiouiqwoueoq
``` 

### 인증 실패
**(1) 잘못된 토큰 또는 누락되었거나**, **(2) 토큰의 유효기간이 만료** 인 경우에 권한없음 예외가 발생합니다. 아래는 예외 코드의 예시입니다.

```
[Response: NotAuthorized.401]
{
    "code": "auth.notAuthorized",
    "message": "사용자 인증이 필요합니다."
}
```

모든 API가 인증을 필요하는 것은 아니나, 인증이 필요한 API의 경우 인증이 없을 시 예외를 반환할 것 입니다. 


## Auth
### GET /auth

```
[Request]
GET /auth
Accept: application/json

[Response: Success.200]
(TODO: 사용자 정보 및 토큰값 반환)
```

### POST /auth/sign-in
`id`와 `password`을 이용해 인증을 합니다.

```
[Request]
POST /auth/sign-in
Accept: application/json
Content-Type: application/json

[Response: Success.200]
(TODO: 사용자 정보 및 토큰값 반환)

[Response: AuthFail.401]
{
    "code": "auth.fail"
    "message": "인증에 실패하였습니다."
}
```


## Papers
### GET /papers/:id
`id`에 해당하는 Paper를 불러옵니다.

```
[Request]
GET /papers/2
Accpet: application/json

[Response: Success.200]
(TODO: 페이퍼 값 반환)

[Response: NotFound.404]
{
    "code": "papers.notFound"
    "message": "페이퍼를 찾을 수 없습니다."
}

[Response: Forbidden.403]
{
    "code": "papers.noPermission"
    "message": "페이퍼를 읽을 권한이 없습니다."
}
```


## Common
### POST /common/files
파일을 S3로 업로드 합니다.

```
[Request]
POST /common/files
Accept: application/json
Content-Type: multipart/form-data

/** 생략 **/

[Response: Success.200]
{
    "id": 1,
    "url": "https://스토리지경로/에서/파일/까지/경로",
    "filename": "image.png",
    "extension": ".png"
}

[Response: Fail.400]
{
    "code": "commonFile.cannotUpload",
    "message": "파일을 업로드할 수 없습니다."
}
```


### GET /common/files/:id
`id` 값에 해당하는 파일을 반환합니다.

```
[Request]
GET /common/files/32
Accept: application/json

[Response: Success.200]
{
    "id": 32,
    "url": "https://스토리지경로/에서/파일/까지/경로",
    "filename": "image.png",
    "extension": ".png"
}

[Response: NotFound.404]
{
    "code": "commonFile.fileNotFound",
    "message": "파일을 찾을 수 없습니다."
}
```
