import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchStockPrice = async () => {
  try {
      const {data} = await axios.get(process.env.ALPHA_URL,
      {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: 'AAPL',
          interval: '1min',
          apikey: process.env.ALPHA_KEY,
        },
      });
      return(data["Time Series (1min)"])
    } catch (e) {
      console.error(e);
    }
}

export default fetchStockPrice;