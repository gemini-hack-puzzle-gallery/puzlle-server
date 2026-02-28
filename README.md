# Puzzle Server

온라인 가상공간 갤러리를 위한 NestJS 서버입니다.

## 설치

```bash
npm install
```

## 데이터베이스 설정

MySQL 데이터베이스가 `localhost:3306`에서 실행 중이어야 하며, `gemini_hack` 데이터베이스가 생성되어 있어야 합니다.

데이터베이스 연결 정보는 `src/app.module.ts`에서 수정할 수 있습니다.

## 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
```

서버는 `http://localhost:3000`에서 실행됩니다.

## 초기 데이터 삽입

제공된 좌표 데이터를 데이터베이스에 삽입하려면:

```bash
npm run seed
```

이 명령은 `display_ranges` 테이블에 초기 좌표 데이터를 삽입합니다.

## API 엔드포인트

### Display Ranges (좌표 조회)

- `GET /display-ranges` - 모든 좌표 조회
- `GET /display-ranges/:id` - 특정 좌표 조회
- `POST /display-ranges` - 좌표 생성
- `POST /display-ranges/bulk` - 여러 좌표 일괄 생성
- `PUT /display-ranges/:id` - 좌표 수정
- `DELETE /display-ranges/:id` - 좌표 삭제
- `POST /display-ranges/:id/upload-image` - 이미지 업로드 (multipart/form-data, field name: 'image')

### 이미지 업로드

이미지 업로드 엔드포인트는 `multipart/form-data` 형식을 사용합니다:
- 필드명: `image`
- 허용 형식: jpg, jpeg, png, gif, webp
- 최대 크기: 10MB
- 업로드된 이미지는 `uploads/images/` 폴더에 저장됩니다
- 이미지 URL은 자동으로 데이터베이스에 저장됩니다

### 정적 파일 제공

업로드된 이미지는 다음 URL로 접근할 수 있습니다:
- `http://localhost:4000/uploads/images/파일명.jpg`

## 데이터 구조

DisplayRange 엔티티:
- `id`: number (자동 생성)
- `x`: number (x 좌표)
- `y`: number (y 좌표)
- `zMin`: number (z 최소값)
- `zMax`: number (z 최대값)
- `flip`: boolean (선택적, 기본값: false)
- `imageUrl`: string (이미지 URL, nullable)