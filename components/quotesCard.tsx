import quotes from "@/quotes/quotes";

const QuoteDisplay = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="p-4 text-center bg-green-100 text-green-800 rounded-md shadow-md">
      <h1 className="text-2xl font-bold font-serif">Quotes of the Day!</h1>
      <p className="text-xl italic mt-5">"{randomQuote.text}"</p>
      <p className="text-sm mt-2"> {randomQuote.author}</p>
    </div>
  );
};

export default QuoteDisplay;
