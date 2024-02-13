const fileInput = document.getElementById('file-input');
const loadButton = document.getElementById('load-button');
const dataTable = document.getElementById('data-table');

loadButton.addEventListener('click', () => {
  // Dosya seçilmemişse uyarı verin
  if (!fileInput.files.length) {
    alert('Lütfen bir JSON dosyası seçin.');
    return;
  }

  // Seçilen programı alın
  const selectedProgram = document.getElementById('floatingSelect').value;

  // Dosyayı okuyun
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const data = JSON.parse(reader.result);

    // Tabloyu temizleyin
    dataTable.tBodies[0].innerHTML = '';

    // JSON verilerini tabloya ekleyin
    for (const row of data) {
      // Başvuru programı ile seçilen programı karşılaştırın
      if (row['Başvurduğu Program'] !== selectedProgram) {
        // Uyarı mesajı gösterin
        alert(`Başvuru programınız (${row['Başvurduğu Program']}) ile seçilen program (${selectedProgram}) aynı değil. Lütfen doğru programı seçin.`);
        continue;
      }

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
    }
  };
  reader.readAsText(file);
});
