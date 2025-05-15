# Node.js 이미지 기반
FROM node:18

# 앱 디렉토리 생성
WORKDIR /app

# package.json과 lock 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 환경 분리
ENV NODE_ENV=production

# 컨테이너에서 실행할 포트
EXPOSE 3000

# 앱 실행
CMD ["npm", "start"]