const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../images');
const outputDir = path.join(__dirname, '../images/optimized');

// Создаем выходную директорию, если она не существует
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Конфигурация для разных размеров изображений
const sizes = {
    large: { width: 1920, height: 1080 },
    medium: { width: 1280, height: 720 },
    small: { width: 640, height: 360 }
};

// Функция для оптимизации изображения
async function optimizeImage(inputPath, filename) {
    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Создаем WebP версии разных размеров
        for (const [size, dimensions] of Object.entries(sizes)) {
            await image
                .resize(dimensions.width, dimensions.height, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 80 })
                .toFile(path.join(outputDir, `${path.parse(filename).name}-${size}.webp`));

            // Создаем JPG версию для фолбэка
            await image
                .resize(dimensions.width, dimensions.height, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .jpeg({ quality: 80, progressive: true })
                .toFile(path.join(outputDir, `${path.parse(filename).name}-${size}.jpg`));
        }

        console.log(`Оптимизировано: ${filename}`);
    } catch (error) {
        console.error(`Ошибка при оптимизации ${filename}:`, error);
    }
}

// Обработка всех изображений в директории
async function processDirectory() {
    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            await optimizeImage(path.join(inputDir, file), file);
        }
    }
}

processDirectory().then(() => {
    console.log('Оптимизация завершена!');
});