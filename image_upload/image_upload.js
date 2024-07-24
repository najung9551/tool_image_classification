document.getElementById('image').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('preview').src = e.target.result;
            document.getElementById('preview-container').style.display = 'block';
            document.getElementById('upload-box').style.display = 'none';  // 업로드 영역 숨기기
        };
        reader.readAsDataURL(file);
    } else {
        document.getElementById('preview-container').style.display = 'none';
        document.getElementById('upload-box').style.display = 'block';  // 업로드 영역 보이기
    }
});

document.getElementById('upload-button').addEventListener('click', async function() {
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("이미지를 선택해주세요.");
        return;
    }

    const ENDPOINT = "https://30findbuneemlcv20240717-prediction.cognitiveservices.azure.com";
    const PREDICTION_KEY = "77fdcfb7028a4933b1b8efe9587a26ea";
    const PROJECT_ID = "f67342fc-9055-4960-b0df-ef9c57dd827f";
    const PUBLISH_ITERATION_NAME = "Hani_wind";

    const url = `${ENDPOINT}/customvision/v3.0/Prediction/${PROJECT_ID}/classify/iterations/${PUBLISH_ITERATION_NAME}/image`;

    const reader = new FileReader();
    reader.onloadend = async function() {
        try {
            document.getElementById('loader').style.display = 'block'; // 로딩 스피너 표시
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Prediction-Key': PREDICTION_KEY,
                    'Content-Type': 'application/octet-stream'
                },
                body: file
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            const prediction = result.predictions[0].tagName;
            const imageData = reader.result;

            localStorage.setItem('uploadedImage', imageData);
            window.location.href = `../classification/classification.html?result=${encodeURIComponent(prediction)}`;
        } catch (error) {
            console.error('Error:', error);
            alert("이미지 분류에 실패했습니다. 다시 시도해주세요.");
        } finally {
            document.getElementById('loader').style.display = 'none'; // 로딩 스피너 숨기기
        }
    };

    reader.readAsDataURL(file);
});
