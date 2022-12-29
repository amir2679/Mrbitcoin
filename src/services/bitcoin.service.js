
import axios from 'axios'
import { storageService } from './storage.service'

export const bitcoinService = {
    getRate,
    getMarketPrices,
    getTradeVolume,
    getAverageBlockSize
    // getConfirmedTransactions
}

const CHARTS_DATA = 'chartsData'
const BITCOIN_CURRENCY = 'bitcoinCurrency'


async function getRate(coins) {
    let bitcoinCurrency = storageService.load(BITCOIN_CURRENCY)
    if(bitcoinCurrency) {
        console.log('load currency from cache')
        return bitcoinCurrency
    }
    try {
        const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`)
        storageService.store(BITCOIN_CURRENCY, data)
        return data
    }
    catch (err) {
        console.log('Error in getting BTC rates', err);
    }
}

async function getMarketPrices() {
    let chartsData = storageService.load(CHARTS_DATA)
    if(chartsData && chartsData.marketPrices) {
        console.log('load marketPrices from cache')
        return chartsData.marketPrices
    }
    try {
        const { data } = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=3months&format=json&cors=true`)
        if(!chartsData) chartsData = {}
        chartsData.marketPrices = data.values
        storageService.store(CHARTS_DATA, chartsData)
        return data.values
    }
    catch (err) {
        console.log('Error in getting BTC market prices', err);
    }
}

async function getTradeVolume() {
    let chartsData = storageService.load(CHARTS_DATA)
    if(chartsData && chartsData['tradeVolume']) {
        console.log('load tradeVolume from cache')
        return chartsData['tradeVolume']
    }
    try {
        const { data } = await axios.get(`https://api.blockchain.info/charts/trade-volume?timespan=3months&format=json&cors=true`)
        if(!chartsData) chartsData = {}
        chartsData['tradeVolume'] = data.values
        storageService.store(CHARTS_DATA, chartsData)
        return data.values
    }
    catch (err) {
        console.log('Error in getting BTC market prices', err);
    }
}

async function getAverageBlockSize() {
    let chartsData = storageService.load(CHARTS_DATA)
    if(chartsData && chartsData['averageBlockSize']) {
        console.log('load averageBlockSize from cache')
        return chartsData['averageBlockSize']
    }
    try {
        const { data } = await axios.get(`https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`)
        if(!chartsData) chartsData = {}
        chartsData['averageBlockSize'] = data.values
        console.log(chartsData);
        storageService.store(CHARTS_DATA, chartsData)
        return data.values
    }
    catch (err) {
        console.log('Error in getting BTC market prices', err);
    }
}