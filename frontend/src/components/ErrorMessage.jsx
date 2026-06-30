function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <p className="text-[#f85149] bg-[#f85149]/10 border border-[#f85149]/40 px-3 py-2.5 rounded-lg mb-4 text-[13.5px]">
      {message}
    </p>
  );
}

export default ErrorMessage;
