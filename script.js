const form = document.getElementById("briefForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const files = document.getElementById("images").files;
  const images = [];

  for (let file of files) {
    const base64 = await toBase64(file);
    images.push({
      name: file.name,
      type: file.type,
      data: base64
    });
  }

  const payload = {
    brand: form.brand.value,
    contact: form.contact.value,
    concept: form.concept.value,
    images: images
  };

  await fetch("https://script.google.com/macros/s/AKfycbwYVmu_waUEpVbg3-M-GyS_dSpH12aoIWWFY5SD7HzcC1UCdKIOuSXB-MkdGa8M_EApvQ/exec", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  alert("Brief berhasil dikirim");
  form.reset();
});

function toBase64(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
