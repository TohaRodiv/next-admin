FROM node:16.13.0-alpine3.11

# Папка приложения
ARG APP_DIR=/usr/app
WORKDIR ${APP_DIR}

# Копируем зависимости
COPY package*.json ./

# Ставим зависимости
RUN npm install

# Копирование файлов проекта
COPY . .

# Собираем приложение
# RUN npm run build

# Запуск проекта
CMD npm run dev