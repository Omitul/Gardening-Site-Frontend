export const resetPassword = async (email: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/api/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  return response.json();
};
