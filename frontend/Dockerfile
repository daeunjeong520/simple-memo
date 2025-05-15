# Node.js 환경 설정
FROM node:16 AS build

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# Vue 프로젝트 빌드
COPY . .
RUN npm run build

# nginx를 사용하여 빌드된 앱을 서빙하기 위한 설정
FROM nginx:alpine

# Vue.js 앱 빌드 파일을 nginx의 기본 웹 디렉토리로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# nginx 서버 실행
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]