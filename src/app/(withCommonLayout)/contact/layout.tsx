export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-full text-center justify-center">{children}</div>
  );
}
