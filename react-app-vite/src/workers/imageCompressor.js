self.onmessage = async (e) => {
    const file = e.data;

    const bitmap = await createImageBitmap(file);

    const size = 200;
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(bitmap, 0, 0, size, size);

    const blob = await canvas.convertToBlob({
        type: "image/jpeg",
        quality: 0.7,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
        self.postMessage(reader.result);
    };

    reader.readAsDataURL(blob);
};
