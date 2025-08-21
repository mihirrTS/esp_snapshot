import { useEffect, useState } from "react";
import quotesData from "./data/quotes.json";
import riddlesData from "./data/riddles.json";
import imagesData from "./data/images.json";
import newsFallbackData from "./data/news.json";

interface Quote {
  text: string;
  author: string;
}

interface Riddle {
  question: string;
  answer: string;
}

interface News {
  headline: string;
}

interface Image {
  url: string;
  description: string;
}

const EInkDisplay = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [riddle, setRiddle] = useState<Riddle | null>(null);
  const [news, setNews] = useState<News | null>(null);
  const [image, setImage] = useState<Image | null>(null);

  useEffect(() => {
    const fetchRandomData = () => {
      setQuote(quotesData[Math.floor(Math.random() * quotesData.length)]);
      setRiddle(riddlesData[Math.floor(Math.random() * riddlesData.length)]);
      setImage(imagesData[Math.floor(Math.random() * imagesData.length)]);
    };

    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=in&apiKey=YOUR_API_KEY"
        );
        const data = await response.json();
        setNews({ headline: data.articles[0].title });
      } catch (error) {
        console.error("Error fetching news, using fallback:", error);
        setNews(
          newsFallbackData[Math.floor(Math.random() * newsFallbackData.length)]
        );
      }
    };

    fetchRandomData();
    fetchNews();

    const interval = setInterval(() => {
      fetchRandomData();
      fetchNews();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[800px] h-[480px] bg-white text-black p-4 flex">
      <div className="w-1/2 flex flex-col justify-between p-2">
        <div className="flex flex-col items-center mb-4">
          <p className="text-lg font-semibold">Mumbai: 30°C, Cloudy</p>
          <p className="text-lg font-semibold">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div
          id="content"
          className="flex flex-col border border-black rounded-lg p-4 shadow-sm bg-white"
        >
          <div id="quote" className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Quote of the Day</h2>
            {quote && (
              <>
                <p className="text-base italic">"{quote.text}"</p>
                <p className="text-sm text-right">- {quote.author}</p>
              </>
            )}
          </div>

          <div id="riddle" className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Riddle of the Day</h2>
            {riddle && (
              <>
                <p className="text-base">{riddle.question}</p>
                <p className="text-sm">Answer: {riddle.answer}</p>
              </>
            )}
          </div>

          <div id="news">
            <h2 className="text-lg font-semibold mb-2">India News</h2>
            {news && <p className="text-base">{news.headline}</p>}
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center">
        {image && (
          <img
            src={image.url}
            alt={image.description}
            className="w-full h-full object-cover rounded-lg grayscale shadow-lg"
          />
        )}
      </div>

      <div className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-600">
        <p>Powered by Unsplash and NewsAPI</p>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="w-[800px] h-[480px]">
      <EInkDisplay />
    </div>
  );
}

export default App;
