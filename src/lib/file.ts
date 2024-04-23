export async function read(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      resolve(content ? content.toString() : "");
    };

    reader.readAsText(file);
  });
}
