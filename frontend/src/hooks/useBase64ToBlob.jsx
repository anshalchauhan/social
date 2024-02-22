const useBase64ToBlob = () => {
  const base64ToBlob = (base64String, contentType = "") => {
    base64String = base64String.replace(/^data:image\/\w+;base64,/, "");

    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i += 1) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);
    return new Blob([byteArray], { type: contentType });
  };

  return base64ToBlob;
};

export default useBase64ToBlob;
