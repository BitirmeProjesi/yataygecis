const fileInput = document.getElementById('file-input');
const loadButton = document.getElementById('load-button');
const dataTable = document.getElementById('data-table');

loadButton.addEventListener('click', () => {
  // Dosya seçilmemişse uyarı verin
  if (!fileInput.files.length) {
    alert('Lütfen bir Excel dosyası seçin.');
    return;
  }

  // Dosyayı okuyun
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);

    // Filtreleme seçeneğini alın
    const filterBy = document.getElementById('filter-select').value;

    // Tabloyu temizleyin
    dataTable.tBodies[0].innerHTML = '';

    // JSON verilerini tabloya ekleyin
    // Başvurulan Sınıfa göre filtreleyin ve ilk 10 öğeyi alın
    const filteredData = data.filter(row => row['Basvurduğu Sınıf'] === filterBy);
    filteredData.sort((a, b) => b['Yerleştirmede Kullanılan Puan'] - a['Yerleştirmede Kullanılan Puan']).slice(0, 10).forEach(row => {
      const html = `
        <tr>
        <td>${row['Adı Soyadı']}</td>
        <td>${row['Kayıtlı Olduğu Kurum']}</td>
        <td>${row['Kayıtlı Olduğu Program']}</td>
        <td>${row['Kayıtlı Olduğu Sınıf']}</td>
        <td>${row['Yüksek Öğretime Yerleştiği Yıl']}</td>
        <td>${row['Yerleştirmede Kullanılan Puan']}</td>
        <td>${row['Yerleştirmede Kullanılan Puan Türü']}</td>
        <td>${row['Not Sistemi']}</td>
        <td>${row['AGNO']}</td>
        <td>${row['Başvurduğu Program']}</td>
        <td>${row['Başvurduğu Öğretim Türü']}</td>
        <td>${row['Basvurduğu Sınıf']}</td>
        </tr>
      `;
      dataTable.tBodies[0].innerHTML += html;
    });
  };
  reader.readAsText(file);
});

// Filtreleme düğmesine tıklanınca filtreleme işlemini gerçekleştir
const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', () => {
  loadButton.click(); // Yükleme düğmesini programmatik olarak tıklayarak filtreleme işlemini başlat
});

// Temizleme işlevi
const clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', () => {
  dataTable.tBodies[0].innerHTML = ''; // Tabloyu temizle
});

// Kaydetme işlevi
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', () => {
  // Burada tabloyu kaydetmek için gerekli işlemleri gerçekleştirin
  alert('Tablo kaydedildi!');
});

// Diğer kodlar buraya gelecek...


