public abstract class AbstractTradingAlgorithm {

    abstract void handleTicker(Ticker ticker) throws Exception;

    public void receiveTick(String tick) throws Exception {
        handleTicker(Ticker.parse(tick));
    }

    static class Ticker {
        String pair;
        double price;

       static Ticker parse(String tick) {
           Ticker ticker = new Ticker();
           String[] tickerSplit = tick.split(",");
           ticker.pair = tickerSplit[0];
           ticker.price = Double.valueOf(tickerSplit[1]);
           return ticker;
       }

    }

}