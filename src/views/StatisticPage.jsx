import { Component } from 'react'

import Chart from '../cmps/Chart'

import { bitcoinService } from '../services/bitcoin.service'

export class StatisticPage extends Component {
    state = {
        marketPrices: null,
        tradeVolume: null,
        avgBlockSize: null
    }
    componentDidMount() {
        this.loadStatisticsData()
    }

    loadStatisticsData = async () => {
        const marketPrices = await bitcoinService.getMarketPrices()
        const tradeVolume = await bitcoinService.getTradeVolume()
        const avgBlockSize = await bitcoinService.getAverageBlockSize()
        this.setState({ marketPrices, tradeVolume, avgBlockSize })
    }

    render() {
        const { marketPrices, tradeVolume, avgBlockSize } = this.state
        if (!marketPrices || !tradeVolume || !avgBlockSize) return <div>Loading...</div>
        // const mpX = marketPrices.map(tv => tv.x)
        // const mpY = marketPrices.map(tv => tv.y)
        // console.log(mpX, mpY);
        //time and value
        return (
            <section className='statistics-page'>
                <Chart data={marketPrices} title={'Market prices(USD):'} unit={'USD($)'} period={'day'} color={'#b04632'}/>
                <Chart data={tradeVolume} title={'Trading volumes:'} unit={'Transactions'} period={'day'} color={'#b04632'}/>
                <Chart data={avgBlockSize} title={'Average block size:'} unit={'Block size'} period={'day'} color={'#b04632'}/>
            </section>
        )
    }
}
