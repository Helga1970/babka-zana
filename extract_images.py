import os
import re
import base64
from bs4 import BeautifulSoup

# --- Настройки ---
INPUT_HTML_FILE = 'index.html'  # Имя вашего текущего HTML-файла с встроенными картинками
OUTPUT_HTML_FILE = 'index_processed.html' # Имя нового HTML-файла с внешними ссылками
IMAGES_DIR = 'images'          # Папка, куда будут сохраняться извлеченные изображения

def extract_and_replace_base64_images(input_html_path, output_html_path, images_output_dir):
    # Создаем папку для изображений, если ее нет
    if not os.path.exists(images_output_dir):
        os.makedirs(images_output_dir)
        print(f"Создана папка: {images_output_dir}")
    else:
        print(f"Папка {images_output_dir} уже существует. Изображения будут добавлены в нее.")

    try:
        with open(input_html_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"Ошибка: Файл '{input_html_path}' не найден.")
        return

    soup = BeautifulSoup(html_content, 'html.parser')
    img_tags = soup.find_all('img')

    extracted_count = 0
    for i, img_tag in enumerate(img_tags):
        src = img_tag.get('src')
        if src and src.startswith('data:image'):
            # Извлекаем тип изображения и данные Base64
            match = re.match(r'data:image/(jpeg|png|gif|webp);base64,(.*)', src)
            if match:
                img_format = match.group(1)
                base64_data = match.group(2)

                # Декодируем Base64
                try:
                    image_data = base64.b64decode(base64_data)
                except base64.binascii.Error as e:
                    print(f"Ошибка декодирования Base64 для изображения {i}: {e}. Пропускаем.")
                    continue

                # Генерируем имя файла изображения
                img_filename = f"image_{extracted_count}.{img_format}"
                img_path = os.path.join(images_output_dir, img_filename)

                # Сохраняем изображение
                try:
                    with open(img_path, 'wb') as img_file:
                        img_file.write(image_data)
                    print(f"Извлечено и сохранено: {img_path}")

                    # Обновляем атрибут src в HTML-теге
                    img_tag['src'] = os.path.join(IMAGES_DIR, img_filename).replace("\\", "/") # Для кроссплатформенности
                    extracted_count += 1
                except IOError as e:
                    print(f"Ошибка при сохранении файла {img_path}: {e}. Пропускаем.")
                    continue
            else:
                print(f"Внимание: Не удалось распознать формат Base64 для изображения {i}. Пропускаем.")

    # Сохраняем модифицированный HTML
    try:
        with open(output_html_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        print(f"\nМодифицированный HTML сохранен в: {output_html_path}")
        print(f"Всего извлечено изображений: {extracted_count}")
    except IOError as e:
        print(f"Ошибка при сохранении модифицированного HTML: {e}")

if __name__ == "__main__":
    print("Запуск скрипта извлечения Base64 изображений...")
    extract_and_replace_base64_images(INPUT_HTML_FILE, OUTPUT_HTML_FILE, IMAGES_DIR)
    print("Работа скрипта завершена.")