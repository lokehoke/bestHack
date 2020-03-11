class myAlgo extends AbstractTradingAlgorithm {
    public void handleTicker(Ticker ticker) throws Exception {
        System.out.println(ticker.pair + ticker.price);
    }
}
