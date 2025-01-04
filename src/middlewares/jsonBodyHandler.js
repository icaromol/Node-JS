export async function jsonBodyHandler(request) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    const body = Buffer.concat(buffers).toString();
    return JSON.parse(body);
  } catch {
    return null;
  }
}
