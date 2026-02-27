export async function handleAsync(form: any, fn: () => Promise<any>, fallbackMessage = "Something went wrong") {
  try {
    const result = await fn();
    return { success: true, data: result };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : fallbackMessage;

    form.setError("root", {
      type: "server",
      message,
    });

    return { success: false };
  }
}
