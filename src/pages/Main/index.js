import React, {useState, useEffect} from 'react';
import api from '../../services/api'
import Input from '../../components/input'

function Main () {
	const [ todayExchangeRate, setTodayExchangeRate ] = useState('')

	useEffect(() => {
		loadTodayExchangeRate()
	})

	const loadTodayExchangeRate = async () => {
		const response = await api.get('/all/USD-BRL');
		setTodayExchangeRate(response.data.USD.bid)
	}

	const [ dollar, setDollar ] = useState(0);
	const [ stateFee, setStateFee ]  = useState(0);
	const [ paymentMethod, setPaymentMethod ] = useState('')

	console.log(paymentMethod)

	return (
		<div>
			Cotação do dolar hoje: R${todayExchangeRate}
			<Input label={'Digite o valor em Dólar: '} type={'number'} value={dollar}
        onChange={e => setDollar(e.currentTarget.value)} />

			<Input label={'Taxa do estado: '} type={'number'} value={stateFee}
				onChange={e => setStateFee(e.currentTarget.value)} />

			<Input label={'Cartão'} type={'radio'} name={'payment'} value={'cartão'} 
				onChange={(e) => setPaymentMethod(e.currentTarget.value)} />
				
			<Input label={'Dinheiro'} type={'radio'} name={'payment'} value={'dinheiro'} 
				onChange={(e) => setPaymentMethod(e.currentTarget.value)} />

		</div>
	)
}

export default Main