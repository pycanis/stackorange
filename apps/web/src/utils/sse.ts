export const subscribeSSE = <T>(url: string, messageHandler: (data: T) => void) => {
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);

    messageHandler(newMessage);
  };

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);

    eventSource.close();
  };

  return eventSource;
};
