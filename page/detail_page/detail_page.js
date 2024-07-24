document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const result = urlParams.get('result');

    // 로컬 스토리지에서 이미지 데이터를 가져옵니다.
    const productImage = localStorage.getItem('productImage');
    if (productImage) {
        document.getElementById('product-image').src = productImage;
    }

    fetch('../data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const product = data[result];
            if (product) {
                document.querySelector(".product-name").innerHTML = `[<span style="color: #186EC0">${product.name}</span>]`;
                document.querySelector(".category").innerHTML = `상품 카테고리: ${product.category} / ${product.name}`;
                document.querySelector(".product-code").innerHTML = `제품코드: <span style="color: #186EC0">${product.product_code}</span>`;
                document.querySelector(".price").innerHTML = `<small>판매가격:</small> <span style="color: #186EC0; font-size: 20px; font-weight: bold;">${product.price.split("원")[0]}</span><span style="color: #666; font-size: 20px; font-weight: bold;">원</span>`;
                document.querySelector(".origin").innerHTML = `<small>원산지:</small> <span style="color: black; font-size: 20px; font-weight: bold;">${product.origin}</span>`;
            }
        })
        .catch(error => console.error('Error fetching product data:', error));

    // 수량 조절 버튼 클릭 이벤트 처리
    const quantityInput = document.getElementById('quantity');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');

    incrementButton.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (!isNaN(currentValue)) {
            quantityInput.value = currentValue + 1;
        }
    });

    decrementButton.addEventListener('click', function() {
        let currentValue = parseInt(quantityInput.value);
        if (!isNaN(currentValue) && currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
});
