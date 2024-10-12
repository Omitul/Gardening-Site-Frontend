export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full text-center justify-center">{children}</div>
  );
}
