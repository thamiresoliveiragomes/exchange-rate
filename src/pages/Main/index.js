import React, {useState, useEffect} from 'react';
import api from '../../services/api'
import Input from '../../components/input'
import CurrencyInput from 'react-currency-input';

function Main () {
	const [ todayExchangeRate, setTodayExchangeRate ] = useState('')

	useEffect(() => {
		loadTodayExchangeRate()
	})

	const loadTodayExchangeRate = async () => {
		const response = await api.get('/all/USD-BRL');
		const todayValue = Number(response.data.USD.bid).toFixed(2)
		setTodayExchangeRate(todayValue)
	}

	const [ dollar, setDollar ] = useState(0);
	const [ stateTax, setStateTax ]  = useState(0);

	const getDollar = (event, maskedvalue, floatvalue) => {
		setDollar(Number(maskedvalue.slice(1)).toFixed(2))
	}

	const getStateTax = (event, maskedvalue, floatvalue) => {
		setStateTax(Number(maskedvalue.slice(0, maskedvalue.length - 1)).toFixed(2))
	}

	const [ paymentMethod, setPaymentMethod ] = useState('')

	const iof = {
		cash: 0.011,
		creditCard: 0.064
	}
	
	const dollarWithTax = (Number(dollar) + ((Number(stateTax)/100) * Number(dollar))).toFixed(2)

	const dollarToReal = (dollarWithTax * todayExchangeRate).toFixed(2)

	const realWithTax = 
		paymentMethod ?
			(paymentMethod === 'cash' ? 
			(Number(dollarWithTax) * (Number(todayExchangeRate) + Number(todayExchangeRate * iof[paymentMethod]))).toFixed(2) : 
			((Number(dollarWithTax) + Number(dollarWithTax * iof[paymentMethod])) * (Number(todayExchangeRate))).toFixed(2)
			) : '0.00'

	return (
		<div>
			<div>
				<nav>
					DÓLAR REAL
				</nav>
				<p>Cotação do dolar hoje: R${todayExchangeRate}</p>
			</div>
			
			<p>
				<label>Digite o valor em doláres: </label>
				<CurrencyInput value={dollar} onChangeEvent={getDollar} prefix='$' thousandSeparator='' />
			</p>

			<p>
				<label>Digite a taxa de estado: </label>
				<CurrencyInput value={stateTax} onChangeEvent={getStateTax} suffix='%' thousandSeparator=''
				placeholder={'Digite a taxa de estado'}/>
			</p>
				
			<Input label={'Dinheiro'} type={'radio'} name={'payment'} value={'cash'} 
				onChange={(e) => setPaymentMethod(e.currentTarget.value)} />

			<Input label={'Cartão'} type={'radio'} name={'payment'} value={'creditCard'} 
				onChange={(e) => setPaymentMethod(e.currentTarget.value)} />

			<p>IOF: {paymentMethod ? (iof[paymentMethod]*100).toFixed(1) + '%' : 'Selecione o método de pagamento'}</p>
			<p>Total em dólar sem imposto ${Number(dollar).toFixed(2)}</p>
			<p>Total em dólar com imposto ${dollarWithTax}</p>
			<p>Total em reais sem imposto R${dollarToReal}</p>
			<p>Total em reais com imposto R${realWithTax}</p>
		</div>
	)
}

export default Main