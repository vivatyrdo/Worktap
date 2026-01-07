/* FILE UPLOAD LOGIC */

document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.querySelector('.js-upload-area');
    const fileInput = document.querySelector('.js-file-input');
    const fileList = document.querySelector('.js-file-list');

    // Визуальный эффект при перетаскивании
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('upload-area--dragover');
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('upload-area--dragover');
        });
    });

    // Обработка выбора файлов
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        const filesArray = Array.from(files);
        
        filesArray.forEach(file => {
            // Создаем элемент файла в списке
            const fileItem = document.createElement('div');
            fileItem.className = 'upload-file';
            
            fileItem.innerHTML = `
                <div class="upload-file__info">
                    <img src="" alt="" style="width: 20px;"> <!-- Иконка документа -->
                    <span class="upload-file__name">${file.name}</span>
                    <div class="upload-file__status">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <button type="button" class="upload-file__remove">×</button>
            `;

            fileList.appendChild(fileItem);

            // Удаление из списка
            fileItem.querySelector('.upload-file__remove').addEventListener('click', () => {
                fileItem.remove();
            });
        });
    }
});